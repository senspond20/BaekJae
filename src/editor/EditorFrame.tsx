import {Editable, Slate, withReact, ReactEditor} from "slate-react";
import {Descendant, Editor, Node as SlateNode, Element as SlateElement, createEditor,} from 'slate'
import {useCallback, useMemo} from "react";
import {SHORTCUTS} from "@/editor/types";
import {useRenderer} from "@/editor/renderer";
import {CustomEditor} from "@/editor/types/element";

type EditorProp ={
    editor : CustomEditor
    initialValue : Descendant[]
}

const BaekjeEditorFrame = ({editor, initialValue} : EditorProp)=>{
    const renderElement = useRenderer()
    const handleDOMBeforeInput = useCallback(
        (e: InputEvent) => {
            queueMicrotask(() => {
                const pendingDiffs = ReactEditor.androidPendingDiffs(editor)

                const scheduleFlush = pendingDiffs?.some(({ diff, path }) => {
                    if (!diff.text.endsWith(' ')) {
                        return false
                    }

                    const { text } = SlateNode.leaf(editor, path)
                    const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1)
                    if (!(beforeText in SHORTCUTS)) {
                        return
                    }

                    const blockEntry = Editor.above(editor, {
                        at: path,
                        match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
                    })
                    if (!blockEntry) {
                        return false
                    }

                    const [, blockPath] = blockEntry
                    return Editor.isStart(editor, Editor.start(editor, path), blockPath)
                })

                if (scheduleFlush) {
                    ReactEditor.androidScheduleFlush(editor)
                }
            })
        },
        [editor]
    )




    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                onDOMBeforeInput={handleDOMBeforeInput}
                renderElement={renderElement}
                placeholder="Write some markdown..."
                spellCheck
                autoFocus
            />
        </Slate>
    )
}
export default BaekjeEditorFrame;