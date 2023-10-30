import {parse} from "./parse/parse";
import * as vscode from "vscode";
export class RustDoc{
    private editor: vscode.TextEditor;

    constructor(editor: vscode.TextEditor) {
        this.editor = editor;
    }

    public generateDoc(){
        const position = this.editor.selection.active;
        const document = this.editor.document.getText();
        // parse(document,position.line);e
        this.editor.insertSnippet(new vscode.SnippetString(
            "/// for (const ${2:element} of ${1:array}) {\t$0}"
        ));
    }

    private generateSnippet(document:string, position:vscode.Position){

    }
}
