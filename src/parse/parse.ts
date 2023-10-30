export function parse(document:string, linePosition:number){
    const nextLines = getNextLines(document, linePosition);
    const nextText = nextLines.join(" ");
    console.log(nextText);
}

// Function for getting the next few lines.
// Currently only gets up to the return type
function getNextLines(document:string, linePosition:number):string[]{
    const lines  = document.split("\n");
    let closingCurlyIdx = 0;
    for (let index = linePosition; index < lines.length; index++) {
        const element = lines[index];
        if (element.includes("{")){
            closingCurlyIdx = index;
            break;
        }
    }
    return lines.slice(linePosition,closingCurlyIdx+1);
}
