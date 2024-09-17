import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('isfs-studio-style-workspace.intersystems-servermanager', (serverTreeItem) => {

		// Get the server id and namespace
        const idArray: string[] = serverTreeItem.id.split(':');
        const serverId = idArray[1];
		const namespace = idArray[3];

		// Set up the workspace folder specs
		const folders: Array<{ name: string, uri: vscode.Uri }> = [];
		folders.push({
			name: `${serverId}:${namespace} - Classes`,
			uri:  vscode.Uri.from({ scheme: 'isfs', authority: `${serverId}:${namespace.toLowerCase()}`, query: 'filter=*.cls' })
		});
		folders.push({
			name: `${serverId}:${namespace} - Routines`,
			uri:  vscode.Uri.from({ scheme: 'isfs', authority: `${serverId}:${namespace.toLowerCase()}`, query: 'filter=*.mac,*.inc,*.int' })
		});
		folders.push({
			name: `${serverId}:${namespace} - CSP Files`,
			uri:  vscode.Uri.from({ scheme: 'isfs', authority: `${serverId}:${namespace.toLowerCase()}`, query: 'csp' })
		});
		folders.push({
			name: `${serverId}:${namespace} - Other`,
			uri:  vscode.Uri.from({ scheme: 'isfs', authority: `${serverId}:${namespace.toLowerCase()}`, query: "filter=*,'*.cls,'*.mac,'*.inc,'*.int" })
		});

		// Append them to the workspace
		vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, ...folders);
 	}));
}

export function deactivate() {

}
