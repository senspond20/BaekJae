import { Editor, Transforms, Range, Point } from "slate";
import {SHORTCUTS} from "src/editor/types";


const applyTransforms = (editor, start, beforeText) => {
    const type = SHORTCUTS[beforeText];
    console.log("type", type);

    if (type) {
        const range = { anchor: editor.selection.anchor, focus: start };
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(editor, { type }, { match: n => Editor.isBlock(editor, n) });

        if (type === "list-item") {
            const list = { type: "bulleted-list", children: [] };
            Transforms.wrapNodes(editor, list, { match: n => n.type === "list-item" });
        }
    }
};

const withShortcuts = editor => {
    editor.insertText = text => {
        if (text === " " && editor.selection && Range.isCollapsed(editor.selection)) {
            const block = Editor.above(editor, { match: n => Editor.isBlock(editor, n) });
            const blockStart = Editor.start(editor, block[1]);

            // Apply transforms if space pressed and block exists
            applyTransforms(editor, blockStart, Editor.string(editor, blockStart, editor.selection.anchor));
            return;
        }

        editor.insertText(text);
    };

    editor.deleteBackward = (...args) => {
        if (editor.selection && Range.isCollapsed(editor.selection)) {
            const blockMatch = Editor.above(editor, { match: n => Editor.isBlock(editor, n) });

            if (blockMatch) {
                const [block, path] = blockMatch;
                const blockStart = Editor.start(editor, path);

                if (block.type !== "paragraph" && Point.equals(editor.selection.anchor, blockStart)) {
                    Transforms.setNodes(editor, { type: "paragraph" });

                    if (block.type === "list-item") {
                        Transforms.unwrapNodes(editor, { match: n => n.type === "bulleted-list", split: true });
                    }

                    return;
                }
            }
        }

        editor.deleteBackward(...args);
    };

    return editor;
};

export default withShortcuts;
