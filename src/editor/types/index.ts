import {Editor, Element, NodeEntry, Path} from "slate";

const TYPE = {
    A: "link",
    BLOCKQUOTE: "block-quote",
    HEADING: "heading",
    H1: "heading-one",
    H2: "heading-two",
    H3: "heading-three",
    H4: "heading-four",
    H5: "heading-five",
    H6: "heading-six",
    IMG: "image",
    LI: "list-item",
    OL: "numbered-list",
    P: "paragraph",
    PRE: "code",
    UL: "bulleted-list",
    BR: "horizontal-rule"
}

const SHORTCUTS = {
    "*": TYPE.LI,
    "-": TYPE.LI,
    "+": TYPE.LI,
    ">": TYPE.BLOCKQUOTE,
    "#": TYPE.HEADING,
    "##": TYPE.HEADING,
    "###": TYPE.HEADING,
    "####": TYPE.HEADING,
    "#####":TYPE.HEADING,
    "######":TYPE.HEADING,
};

export type CheckMdParams = {
    sel: Range
    editor: Editor, path: Path,
    match: RegExpMatchArray,
    el: Element
    startText: string
}

export interface MdNode {
    reg: RegExp,
    matchKey?: string | RegExp
    checkAllow?: (ctx: { editor: Editor, node: NodeEntry<Element>, sel: Range }) => boolean
    run: (ctx: CheckMdParams) => void | boolean
}

export {
    TYPE,
    SHORTCUTS
};
