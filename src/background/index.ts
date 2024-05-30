import { getCurrentView } from './views'

console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
	if (request.type === 'COUNT') {
		console.log('background has received a message from popup, and count is ', request?.count)
	}
})

// const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'
//
chrome.action.onClicked.addListener(async (tab) => {
	if (tab.url) {
		console.log('Current view is ', getCurrentView(tab.url))
	}

	// if (tab.url?.startsWith(extensions) || tab.url?.startsWith(webstore)) {
	// 	// Retrieve the action badge to check if the extension is 'ON' or 'OFF'
	// 	const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
	// 	// Next state will always be the opposite
	// 	const nextState = prevState === 'ON' ? 'OFF' : 'ON'

	// 	// Set the action badge to the next state
	// 	await chrome.action.setBadgeText({
	// 		tabId: tab.id,
	// 		text: nextState,
	// 	})
	// }
})
