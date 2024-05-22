import {useCallback} from "react";
import {TYPE} from "@/editor/types";
import {CustomRenderElementProps, HeadingElement} from "@/editor/types/element";
import {Heading} from "@/editor/renderer/elements/Heading";

const Element = ({element, attributes, children}: CustomRenderElementProps) => {
    switch (element.type) {
        case TYPE.BLOCKQUOTE:
            return <blockquote {...attributes}>{children}</blockquote>
        case TYPE.UL:
            return <ul {...attributes}>{children}</ul>
        case TYPE.LI:
            return <li {...attributes}>{children}</li>
        case TYPE.HEADING:
            return <Heading attributes={attributes} children={children} element={element as HeadingElement}/>
        default:
            return <p {...attributes}>{children}</p>
    }
}

export function useRenderer(){
    return useCallback(props => <Element {...props} />, []);
}