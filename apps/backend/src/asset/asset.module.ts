import { Module } from '@nestjs/common'
import { AssetController } from './controller/asset.controller.js'

@Module({
	controllers: [AssetController],
})
export class AssetModule {}
