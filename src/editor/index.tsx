import React, {useMemo} from "react";
import EditorFrame from "@/editor/EditorFrame";
import {createEditor, Descendant} from "slate";
import withShortcuts from "@/editor/plugins/shortcut";
import {withReact} from "slate-react";
import {withHistory} from "slate-history";

const BaekjeEditor = ()=>{
    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [
                {
                    text: 'The editor gives you full control over the logic you can add. For example, it\'s fairly common to want to add markdown-like shortcuts to editors. So that, when you start a line with "> " you get a blockquote that looks like this:',
                },
            ],
        },
        {
            type: 'block-quote',
            children: [{ text: 'A wise quote.' }],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text: 'Order when you start a line with "## " you get a level-two heading, like this:',
                },
            ],
        },
        {
            type: 'heading-two',
            children: [{ text: 'Try it out!' }],
        },
        {
            type: 'paragraph',
            children: [
                {
                    text: 'Try it out for yourself! Try starting a new line with ">", "-", or "#"s.',
                },
            ],
        },
    ]
    const editor = useMemo(
        () => withShortcuts(withReact(withHistory(createEditor()))),
        []
    )
    return (
        <div>
           <EditorFrame editor={editor} initialValue={initialValue}/>
        </div>
    );
}
export default BaekjeEditor;