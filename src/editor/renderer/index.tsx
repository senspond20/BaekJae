import {useCallback} from "react";
import {TYPE} from "@/editor/types";

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case TYPE.BLOCKQUOTE:
            return <blockquote {...attributes}>{children}</blockquote>
        case TYPE.UL:
            return <ul {...attributes}>{children}</ul>
        case TYPE.LI:
            return <li {...attributes}>{children}</li>
        case TYPE.H1:
            return <h1 {...attributes}>{children}</h1>
        case TYPE.H2:
            return <h2 {...attributes}>{children}</h2>
        case TYPE.H3:
            return <h3 {...attributes}>{children}</h3>
        case TYPE.H4:
            return <h4 {...attributes}>{children}</h4>
        case TYPE.H5:
            return <h5 {...attributes}>{children}</h5>
        case TYPE.H6:
            return <h6 {...attributes}>{children}</h6>
        case 'katex':
            return <h3 {...attributes}>{children}</h3>
        default:
            return <p {...attributes}>{children}</p>
    }
}

export function useRenderer(){
    return useCallback(props => <Element {...props} />, []);
}