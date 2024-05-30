import { getCurrentView } from '../background/views'

console.info('contentScript is running')

console.log('Current pathname is ', window.location.pathname)
console.log('Current view is ', getCurrentView(window.location.pathname))
