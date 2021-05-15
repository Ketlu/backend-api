import { Module } from '@nestjs/common'
import { ProviderFactoryService } from './factory.service'

@Module({
    providers: [ProviderFactoryService],
    exports: [ProviderFactoryService]
})
export class ProviderFactoryModule {}
