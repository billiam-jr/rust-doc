import { ArgTuple } from "../constants";
export function generateDocString(document: string, linePosition: number): string {
    const nextLines = getNextLines(document, linePosition);
    const nextText = nextLines.join(" ");
    let params = getParameters(nextText);
    let returnType = getReturn(nextText);
    let toReturn = generateString(params, returnType);
    console.log(toReturn);
    return toReturn;
}

function generateString(params: ArgTuple[], returnType: string): string {
    var count = 1;
    var toReturn = "/// ${" + count + ":__summary__}\n";
    if (params.length > 0) {
        toReturn += "/// Args:\n";
    }
    for (let index = 0; index < params.length; index++) {
        const elements = params[index];
        toReturn += `///     \${${++count}:${elements[0]}}`;
        toReturn += ` (\${${++count}:${elements[1]}}): \${${++count}:__description__}\n`;
    }
    if(returnType.length>0){
        toReturn += `/// Returns:\n///     \${${++count}:${returnType}}`;
    }
    return toReturn.trim();
}

function getReturn(line: string): string {
    const arrow = "->";
    if (!line.includes(arrow)) {
        return "";
    }
    const tempRetType = line.split(arrow)[1].trim();
    return tempRetType.replace("{", "").trim();

}

function getParameters(line: string): ArgTuple[] {
    var args = new Array<ArgTuple>();
    const openBracketIndex = line.indexOf("(");
    if (openBracketIndex === undefined) {
        return args;
    }
    const closeBracketIndex = line.indexOf(")");
    if (closeBracketIndex === undefined) {
        return args;
    }
    const argStr = line.slice(openBracketIndex + 1, closeBracketIndex);
    if (argStr.length === 0) {
        return args;
    }
    const paramParts = argStr.split(",");
    for (let index = 0; index < paramParts.length; index++) {
        const elements = paramParts[index].split(":");
        args.push([elements[0].trim(), elements[1].trim()]);
    }
    return args;
}


// Function for getting the next few lines.
// Currently only gets up to the return type
function getNextLines(document: string, linePosition: number): string[] {
    const lines = document.split("\n");
    let closingCurlyIdx = 0;
    for (let index = linePosition; index < lines.length; index++) {
        const element = lines[index];
        if (element.includes("{")) {
            closingCurlyIdx = index;
            break;
        }
    }
    return lines.slice(linePosition, closingCurlyIdx + 1);
}
