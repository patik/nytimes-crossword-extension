import { z } from 'zod'

console.info('contentScript is running')

// /crosswords/archive
// /crosswords/archive/daily/2021/06
// /crosswords/game/daily/2021/06/02

const mainArchivePattern = /^\/crosswords\/archive\/?$/
const monthArchivePattern = /^\/crosswords\/archive\/daily\/(?<year>\d+)\/(?<month>\d+)\/?$/
const dailyGamePattern = /^\/crosswords\/game\/daily\/(?<date>\d+\/\d+\/\d+)\/?$/

function isDailyGame(url: string) {
	return dailyGamePattern.test(url)
}

function isMonthlyArchive(url: string) {
	return monthArchivePattern.test(url)
}

function isArchivePortal(url: string) {
	return mainArchivePattern.test(url)
}

// const DailyGameDateSchema = z.object({
// 	year: z.coerce.number().min(1900),
// 	month: z.coerce.number().max(12).min(1),
// 	day: z.coerce.number().max(31).min(2),
// })

// type DailyGameDate = z.infer<typeof DailyGameDateSchema>

function getDailyGameDate(url: string): Date {
	const { groups } = dailyGamePattern.exec(url) ?? {}

	if (!groups) {
		throw new Error('Could not parse daily game date')
	}

	return z.date().parse(groups.date.replaceAll('/', '-'))
}

const MonthArchiveDateSchema = z.object({
	year: z.coerce.number().min(1900),
	month: z.coerce.number().max(12).min(1),
})

// extract the inferred type like this
type MonthArchiveDate = z.infer<typeof MonthArchiveDateSchema>

function getMonthArchiveDate(url: string): Date {
	const { groups } = dailyGamePattern.exec(url) ?? {}

	if (!groups) {
		throw new Error('Could not parse daily game date')
	}

	return z.date().parse(groups.date.replaceAll('/', '-'))
}

type View = 'daily-game' | 'month-archive' | 'archive-portal' | 'none'

export function getCurrentView(url: string): View {
	if (isDailyGame(url)) {
		return 'daily-game'
	}

	if (isMonthlyArchive(url)) {
		return 'month-archive'
	}

	if (isArchivePortal(url)) {
		return 'archive-portal'
	}

	return 'none'
}
