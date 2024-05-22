import {createElement, useMemo} from "react";
import {ElementProps, HeadingElement} from "@/editor/types/element";
import {Node} from 'slate'

export function Heading({element, attributes, children}: ElementProps<HeadingElement>) {
    return useMemo(() => {
        const str = Node.string(element)
        return createElement(`h${element.level}`, {
            ...attributes,
            ['data-type']: 'heading',
            ['data-label']: `${element.level}`,
            ['data-value']: str || '',
        }, (
            <>
                {children}
            </>
        ))
    }, [element.level, element.children])
}
