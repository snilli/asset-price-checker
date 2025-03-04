import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common'
import yahooFinance from 'yahoo-finance2'

@Controller('assets')
export class AssetController {
	constructor() {}

	@Get('/search/:name')
	async search(@Param('name') name: string) {
		const data = await yahooFinance.search(name, { quotesCount: 999 })
		const res = []
		for (const quote of data.quotes) {
			if (quote.isYahooFinance) {
				res.push({
					symbol: quote.symbol,
					name: quote.shortname,
					exchange: quote.exchange,
					type: quote.quoteType,
				})
			}
		}

		return res
	}

	@Get('/symbol/:symbol')
	async getSymbol(@Param('symbol') quote: string) {
		try {
			const data = await yahooFinance.quoteSummary(quote, { modules: ['price'] })
			if (!data.price) {
				return null
			}

			return {
				longName: data.price.longName,
				shortName: data.price.shortName,
				regularMarketTime: data.price.regularMarketTime,
				regularMarketPrice: data.price.regularMarketPrice,
				regularMarketDayHigh: data.price.regularMarketDayHigh,
				regularMarketDayLow: data.price.regularMarketDayLow,
				regularMarketVolume: data.price.regularMarketVolume,
			}
		} catch {
			throw new HttpException('Symbol Not Found', HttpStatus.NOT_FOUND)
		}
	}
}
