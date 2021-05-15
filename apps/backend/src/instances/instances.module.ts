import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProviderModule } from '../provider/provider.module'
import { InstancesCreateController } from './create/create.controller'
import { InstancesCreateService } from './create/create.service'
import { InstanceEntity } from './instances.entity'
import { InstanceRepository } from './instances.repository'
import { InstancesListController } from './list.controller'
import { InstancesListService } from './list.service'
import { InstancesStatusController } from './status/status.controller'
import { InstancesStatusService } from './status/status.service'

@Module({
    imports: [ProviderModule, TypeOrmModule.forFeature([InstanceEntity, InstanceRepository])],
    controllers: [InstancesCreateController, InstancesListController, InstancesStatusController],
    providers: [InstancesCreateService, InstancesListService, InstancesStatusService]
})
export class InstancesModule {}
