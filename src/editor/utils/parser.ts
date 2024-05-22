import {unified} from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

const parser = () => {
    return unified()
        .use(markdown)
        .use(remark2rehype)
        .use(html)
};

export {
    parser
}