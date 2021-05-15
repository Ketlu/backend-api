import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InstanceEntity } from '../../../backend/src/instances/instances.entity'
import { InstanceRepository } from '../../../backend/src/instances/instances.repository'
import { ProviderFactoryModule } from '../provider-factory/factory.module'
import { InstancesPendingApp } from './pending/pending.app'
import { InstancesStatusApp } from './status/status.app'

@Module({
    imports: [ProviderFactoryModule, TypeOrmModule.forFeature([InstanceEntity, InstanceRepository])],
    providers: [InstancesPendingApp, InstancesStatusApp]
})
export class InstancesModule {}
