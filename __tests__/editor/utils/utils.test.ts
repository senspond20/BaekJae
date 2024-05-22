import {parser} from "@/editor/utils/parser";


describe("utils/parser", ()=>{
    const markdown = `# Heading1
    + hello
    + banana
    
    ## Heading2`

    /**
     * markdown parte to node
     */
    test("parse", async ()=>{
        const data = parser().parse(markdown)
        console.log(data)
    })

    /**
     * markdown parse to html
     */
    test("process", async ()=>{
        const data = await parser().process(markdown)
        console.log(data)
    })
})