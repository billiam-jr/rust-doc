import { generateDocString } from "./parse/parse";
import * as vscode from "vscode";
export class RustDoc {
    private editor: vscode.TextEditor;

    constructor(editor: vscode.TextEditor) {
        this.editor = editor;
    }

    public generateDoc() {
        const position = this.editor.selection.active;
        const document = this.editor.document.getText();
        var theString = generateDocString(document, position.line);
        this.editor.insertSnippet(new vscode.SnippetString(theString));
    }

    private generateSnippet(document: string, position: vscode.Position) {

    }
}
