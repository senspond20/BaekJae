import {parser} from "@/editor/utils/parser";


describe("utils/parser", ()=>{
    const markdown = `# Heading1
    + hello
    + banana
    
    ## Heading2`

    test("mdParser", async ()=>{
        const data = await parser(markdown)
        console.log(data)
    })
})