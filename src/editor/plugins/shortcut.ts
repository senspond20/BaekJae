import {
    Editor,
    Element as SlateElement,
    Point,
    Range,
    Transforms,
} from 'slate'
import {SHORTCUTS, TYPE} from "@/editor/types";
import {BulletedListElement, CustomEditor, CustomElement, HeadingElement} from "@/editor/types/element";

function isSlateElement(node: any): boolean {
    return !Editor.isEditor(node) && SlateElement.isElement(node);
}

const getBlock = (editor: Editor) => Editor.above(editor, {
    match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
});

const getRange = (anchor: Point, start: Point): Range => ({
    anchor,
    focus: start
});

const transformationForType = (editor: Editor, range: Range, type: string) => {
    Transforms.select(editor, range);
    if (!Range.isCollapsed(range)) {
        Transforms.delete(editor);
    }
    const newProperties: Partial<CustomElement> = { type };

    Transforms.setNodes<SlateElement>(editor, newProperties, {
        match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
    });


    if (type === 'list-item') {
        const list: BulletedListElement = {
            type: 'bulleted-list',
            children: [],
        };
        Transforms.wrapNodes(editor, list, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'list-item',
        });
    }
};


const withShortcuts = (editor : CustomEditor) => {
    const { deleteBackward, insertText } = editor


    editor.insertText = (text) => {
        console.log(text)
        const { selection } = editor;
        if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
            const block = getBlock(editor);
            const { anchor } = selection;
            const path = block ? block[1] : [];
            const start = Editor.start(editor, path);
            const range = getRange(anchor, start);
            const beforeText = Editor.string(editor, range) + text.slice(0, -1);
            const type = SHORTCUTS[beforeText];

            if (type) {
                if(type == TYPE.HEADING){
                    const reg = /^\s*(#{1,5})(\s+)([^\n]*)$/
                    const match = reg.exec(text)
                    Transforms.delete(editor, {
                        at: path
                    })
                    if (match) {
                        Transforms.insertNodes(editor, {
                            type: 'heading', level: match[1].length, children: []
                        }, {
                            at: path
                        })
                    }
                    Transforms.select(editor, Editor.start(editor, path))
                }else{
                    transformationForType(editor, range, type);
                }
                return;
            }
        }
        insertText(text);
    };

    editor.deleteBackward = (...args) => {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const match = getBlock(editor)
            if (match) {
                const [block, path] = match
                const start = Editor.start(editor, path)

                if (
                    isSlateElement(block) &&
                    block.type !== 'paragraph' &&
                    Point.equals(selection.anchor, start)
                ) {
                    const newProperties: Partial<SlateElement> = {
                        type: 'paragraph',
                    }
                    Transforms.setNodes(editor, newProperties)

                    if (block.type === 'list-item') {
                        Transforms.unwrapNodes(editor, {
                            match: n => isSlateElement(n) && n.type === 'bulleted-list',
                            split: true,
                        })
                    }

                    return
                }
            }

            deleteBackward(...args)
        }
    }

    return editor
}

export default withShortcuts;
