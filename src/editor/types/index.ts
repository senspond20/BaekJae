
const TYPE = {
    A: "link",
    BLOCKQUOTE: "block-quote",
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

// const SHORTCUTS_MAP = new Map()
// SHORTCUTS_MAP.set("*", TYPE.LI)



const SHORTCUTS = {
    "*": TYPE.LI,
    "-": TYPE.LI,
    "+": TYPE.LI,
    ">": TYPE.BLOCKQUOTE,
    "#": TYPE.H1,
    "##": TYPE.H2,
    "###": TYPE.H3,
    "####": TYPE.H4,
    "#####":TYPE.H5,
    "######":TYPE.H6,
};

export {
    TYPE,
    SHORTCUTS
};
