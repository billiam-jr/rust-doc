// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {RustDoc} from "./rust_doc";
import { extensionRoot, generateRustDocstringCommand, extensionID } from "./constants";
import { log } from 'console';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	extensionRoot.path = context.extensionPath;
	let rustDisposable = vscode.commands.registerCommand(generateRustDocstringCommand , () =>{
		const editor = vscode.window.activeTextEditor!;
		const rustDoc = new RustDoc(editor);
		return rustDoc.generateDoc();
	});

	const docProvider = vscode.languages.registerCompletionItemProvider(
		"rust",
		{
		  provideCompletionItems(
			document: vscode.TextDocument,
			position: vscode.Position
		  ) {
			// get all text until the `position` and check if it reads `console.`
			// and if so then complete if `log`, `warn`, and `error`
			const linePrefix = document
			  .lineAt(position)
			  .text.slice(0, position.character);
			if (!linePrefix.endsWith("///")) {
			  return undefined;
			}

			return [new RustDocstringCompletionItem(document, position)];
		},
		},
		"/"
	);
	context.subscriptions.push(rustDisposable);
	context.subscriptions.push(docProvider);
}



class RustDocstringCompletionItem extends vscode.CompletionItem {
	constructor(_: vscode.TextDocument, position: vscode.Position) {
	  super("Generate Docstring", vscode.CompletionItemKind.Snippet);
	  this.insertText = "";
	  this.filterText = "///";
	  this.sortText = "\0";

	  this.range = new vscode.Range(
		new vscode.Position(position.line, 0),
		position
	  );

	  this.command = {
		command: generateRustDocstringCommand,
		title: "Generate Rust Docs",
	  };
	}
  }

// This method is called when your extension is deactivated
export function deactivate() {}
