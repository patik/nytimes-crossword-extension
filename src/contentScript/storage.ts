import { z } from 'zod'

const STORAGE_KEY = 'archive-month-view'

async function getStoredMonthPreference(): Promise<Date | null> {
	return Promise.resolve(
		chrome.storage.local.get([STORAGE_KEY]).then((result) => {
			console.log('Value is ' + result.key)

			if (z.coerce.date().parse(result.key)) {
				//
			}

			return new Date()
		}),
	)
}
