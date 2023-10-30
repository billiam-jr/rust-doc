// Will be set in extension activation.
type ExtensionRoot = { path?: string };
export const extensionRoot: ExtensionRoot = { path: "" };

export const debug = true;
export const extensionID = "rust-doc";
export const generateRustDocstringCommand = "rust-doc.generateRustDocstringCommand";
