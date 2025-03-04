import { createZodDto } from 'nestjs-zod/dto'
import { z } from 'zod'

const AssetSearchResponseSchema = z.object({
	symbol: z.string(),
	name: z.string(),
	exchange: z.string(),
	type: z.string(),
})

export class AssetSearchApiResponseSchema extends createZodDto(z.array(AssetSearchResponseSchema)) {}
export class AssetSearchResponseDTO extends createZodDto(AssetSearchResponseSchema) {}

const AssetSymbolResponseSchema = z.object({
	longName: z.string(),
	shortName: z.string(),
	marketTime: z.date(),
	marketPrice: z.number(),
	marketDayHigh: z.number(),
	marketDayLow: z.number(),
	marketVolume: z.number(),
})

export class AssetSymbolApiResponseSchema extends createZodDto(AssetSymbolResponseSchema) {}
export class AssetSymbolResponseDTO extends createZodDto(AssetSymbolResponseSchema) {}
