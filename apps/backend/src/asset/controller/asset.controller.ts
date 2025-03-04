import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import yahooFinance from 'yahoo-finance2'
import {
	AssetSearchApiResponseSchema,
	AssetSearchResponseDTO,
	AssetSymbolApiResponseSchema,
	AssetSymbolResponseDTO,
} from '../dto/asset.dto.js'

@Controller('assets')
export class AssetController {
	constructor() {}

	@Get('/search/:name')
	@ApiOkResponse({
		type: AssetSearchApiResponseSchema,
	})
	@ZodSerializerDto(AssetSearchResponseDTO)
	async search(@Param('name') name: string) {
		const data = await yahooFinance.search(name)
		const res = []
		for (const quote of data.quotes) {
			if (quote.isYahooFinance) {
				res.push({
					symbol: quote.symbol,
					name: quote.shortname ?? quote.longname,
					exchange: quote.exchange,
					type: quote.quoteType,
				})
			}
		}

		return res
	}

	@Get('/symbol/:symbol')
	@ApiOkResponse({
		type: AssetSymbolApiResponseSchema,
	})
	@ZodSerializerDto(AssetSymbolResponseDTO)
	async getSymbol(@Param('symbol') symbol: string) {
		try {
			const data = await yahooFinance.quoteSummary(symbol, { modules: ['price'] })
			if (!data.price) {
				return null
			}

			return {
				longName: data.price.longName,
				shortName: data.price.shortName,
				marketTime: data.price.regularMarketTime,
				marketPrice: data.price.regularMarketPrice,
				marketDayHigh: data.price.regularMarketDayHigh,
				marketDayLow: data.price.regularMarketDayLow,
				marketVolume: data.price.regularMarketVolume,
			}
		} catch {
			throw new HttpException('Symbol Not Found', HttpStatus.NOT_FOUND)
		}
	}
}
