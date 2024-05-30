import { getCurrentView } from './views'

console.info('contentScript is running')

console.log('Current pathname is ', window.location.pathname)
console.log('Current view is ', getCurrentView(window.location.pathname))

window.addEventListener('popstate', (...args) => {
	console.log('popstate callback ', window.location.pathname, ...args)
})

// @ts-expect-error This is actually supported
window.navigation.addEventListener('navigate', (event) => {
	console.log(
		'location changed! view is now ',
		event.destination.url,
		getCurrentView(event.destination.url),
		window.location.pathname,
		event,
	)
})
