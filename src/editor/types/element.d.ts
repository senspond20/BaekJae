import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate'
import {ReactEditor, RenderElementProps} from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockQuoteElement = { type: 'block-quote', align?: string,  children: Descendant[]}
export type BulletedListElement = { type: 'bulleted-list', align?: string,children: Descendant[]}
export type CheckListItemElement = { type: 'check-list-item', checked: boolean, children: Descendant[]}
export type EditableVoidElement = {type: 'editable-void', children: EmptyText[]}
export type HeadingElement = {type: 'heading', children: Descendant[], level: number}
export type ImageElement = { type: 'image', url: string, children: EmptyText[]}
export type LinkElement = { type: 'link', url: string, children: Descendant[] }
export type ButtonElement = { type: 'button', children: Descendant[] }
export type BadgeElement = { type: 'badge', children: Descendant[] }
export type ListItemElement = { type: 'list-item', children: Descendant[] }
export type MentionElement = { type: 'mention', character: string, children: CustomText[]}
export type ParagraphElement = { type: 'paragraph', align?: string, children: Descendant[]}
export type TableElement = { type: 'table'; children: TableRowElement[] }
export type TableRowElement = { type: 'table-row'; children: TableCellElement[] }
export type TableCellElement = { type: 'table-cell'; children: CustomText[] }
export type TitleElement = { type: 'title'; children: Descendant[] }
export type VideoElement = { type: 'video'; url: string; children: EmptyText[] }
export type CodeBlockElement = { type: 'code-block',language: string,children: Descendant[] }
export type CodeLineElement = { type: 'code-line',children: Descendant[] }

export type CustomElement =
    | BlockQuoteElement
    | BulletedListElement
    | CheckListItemElement
    | EditableVoidElement
    | HeadingElement
    | ImageElement
    | LinkElement
    | ButtonElement
    | BadgeElement
    | ListItemElement
    | MentionElement
    | ParagraphElement
    | TableElement
    | TableRowElement
    | TableCellElement
    | TitleElement
    | VideoElement
    | CodeBlockElement
    | CodeLineElement

export interface CustomRenderElementProps {
    children: any;
    element: CustomElement;
    attributes: {
        'data-slate-node': 'element';
        'data-slate-inline'?: true;
        'data-slate-void'?: true;
        dir?: 'rtl';
        ref: any;
    };
}

export type CustomText = {
    bold?: boolean
    italic?: boolean
    code?: boolean
    text: string
}


export type EmptyText = {
    text: string
}

export type CustomEditor = BaseEditor &
    ReactEditor &
    HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
}

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor
        Element: CustomElement
        Text: CustomText | EmptyText
        Range: BaseRange & {
            [key: string]: unknown
        }
    }
}
// @ts-ignore
export interface ElementProps<T = Element> extends RenderElementProps{
    element: T
}