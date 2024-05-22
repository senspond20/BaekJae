import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

const mdParser = async (string: string) => {
    const data = await unified()
        .use(markdown)
        .use(remark2rehype)
        .use(html)
        .process(string);
    console.log("contents", data.contents);
    return data;
};

export {
    mdParser
}