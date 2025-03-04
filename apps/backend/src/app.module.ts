import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AssetModule } from './asset/asset.module.js'
@Module({
	imports: [
		CacheModule.register({
			ttl: 10 * 60 * 1000,
			isGlobal: true,
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env.development.local', '.env.development'],
			isGlobal: true,
		}),
		AssetModule,
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
