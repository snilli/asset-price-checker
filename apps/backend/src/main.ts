import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'compression'
import express from 'express'
import { AppModule } from './app.module.js'

async function bootstrap() {
	const expressApp = express()
	const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
	app.enableCors()
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	})
	app.use(compression())

	const options = new DocumentBuilder()
		.setTitle('Asset-price-checker')
		.setDescription('API for checking the price of assets, including Stocks and cryptocurrencies.')
		.setVersion('1.0')
		.build()

	const mainApiDocument = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api', app, mainApiDocument)
	await app.listen(8080)
}

bootstrap().catch(console.error)
