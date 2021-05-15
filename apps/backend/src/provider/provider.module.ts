import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationModule } from '../locations/location.module'
import { OsModule } from '../os/os.module'
import { ProviderLocationEntity } from './location/location.entity'
import { ProviderLocationService } from './location/location.service'
import { ProviderOsEntity } from './os/os.entity'
import { ProviderOsService } from './os/os.service'
import { ProviderPlanController } from './plan/plan.controller'
import { ProviderPlanEntity } from './plan/plan.entity'
import { ProviderPlanService } from './plan/plan.service'
import { ProviderEntity } from './provider.entity'
import { ProviderService } from './provider.service'

@Module({
    imports: [
        LocationModule,
        OsModule,
        TypeOrmModule.forFeature([ProviderEntity, ProviderLocationEntity, ProviderPlanEntity, ProviderOsEntity])
    ],
    providers: [ProviderService, ProviderLocationService, ProviderPlanService, ProviderOsService],
    controllers: [ProviderPlanController],
    exports: [TypeOrmModule, ProviderService, ProviderLocationService, ProviderPlanService, ProviderOsService]
})
export class ProviderModule {}
