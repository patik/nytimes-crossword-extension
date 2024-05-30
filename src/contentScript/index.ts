console.info('contentScript is running')

// /crosswords/archive
// /crosswords/archive/daily/2021/06
// /crosswords/game/daily/2021/06/02

const mainArchivePattern = /^\/crosswords\/archive\/?$/
const monthArchivePattern = /^\/crosswords\/archive\/daily\/(?<year>\d+)\/(?<month>\d+)\/?$/
const dailyGamePattern = /^\/crosswords\/game\/daily\/(?<year>\d+)\/(?<month>\d+)\/(?<day>\d+)\/?$/

function isDailyGame(url: string) {
	return dailyGamePattern.test(url)
}

function isMonthlyArchive(url: string) {
	return monthArchivePattern.test(url)
}

function isMainArchive(url: string) {
	return mainArchivePattern.test(url)
}

type DailyGameDate = {
	year: string
	month: string
	day: string
}

function getDailyGameDate(url: string): DailyGameDate {
	const { groups } = dailyGamePattern.exec(url) ?? {}

	if (!groups) {
		throw new Error('Could not parse daily game date')
	}

	return groups as DailyGameDate
}
