// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "rust-doc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rust-doc.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from rust-doc!');
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

	context.subscriptions.push(doc_provider);
	context.subscriptions.push(disposable);
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
		command: "rust-doc.helloWorld",
		title: "Generate Docstring",
	  };
	}
  }

// This method is called when your extension is deactivated
export function deactivate() {}
