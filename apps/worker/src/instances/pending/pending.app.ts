import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InstanceEntity } from '../../../../backend/src/instances/instances.entity'
import { InstanceRepository } from '../../../../backend/src/instances/instances.repository'
import { EInstanceStatus } from '../../../../backend/src/instances/status.enum'
import { ProviderFactoryService } from '../../provider-factory/factory.service'
import { In } from 'typeorm'
import * as sleep from 'sleep-promise'

@Injectable()
export class InstancesPendingApp {
    constructor(
        private readonly providerFactory: ProviderFactoryService,

        @InjectRepository(InstanceRepository)
        private readonly repository: InstanceRepository
    ) {}

    async beginPool() {
        // Ожидающие действий статусы
        const pendingStatuses = [
            EInstanceStatus.CREATION_PENDING,
            EInstanceStatus.START_PENDING,
            EInstanceStatus.STOP_PENDING,
            EInstanceStatus.REBOOT_PENDING,
            EInstanceStatus.REMOVE_PENDING
        ]

        // Получаем ожидающие изменений инстансы
        const instances = await this.repository.find({
            relations: ['provider', 'location', 'plan', 'os'],
            where: {
                status: In(pendingStatuses)
            }
        })

        for (const instance of instances) {
            // Создаем инстанс у провайдера
            if (instance.status === EInstanceStatus.CREATION_PENDING) {
                await this.create(instance)
            }

            // Стартуем инстанс у провайдера
            if (instance.status === EInstanceStatus.START_PENDING) {
                await this.start(instance)
            }

            // Останавливаем инстанс у провайдера
            if (instance.status === EInstanceStatus.STOP_PENDING) {
                await this.stop(instance)
            }

            // Перезапускаем инстанс у провайдера
            if (instance.status === EInstanceStatus.REBOOT_PENDING) {
                await this.reboot(instance)
            }

            // Удаляем инстанс у провайдера
            if (instance.status === EInstanceStatus.REMOVE_PENDING) {
                await this.remove(instance)
            }

            // Спим 300мс
            await sleep(300)
        }

        // Спим 1000мс
        await sleep(1000)

        this.beginPool()
    }

    async create(entity: InstanceEntity) {
        const builder = this.providerFactory.createInstanceBuilder(entity.provider)

        builder.setPlan(entity.plan)
        builder.setLocation(entity.location)
        builder.setOperatingSystem(entity.os)
        builder.setName(entity.name)

        const instance = await builder.execute()

        await this.repository.update(entity.id, {
            internalId: instance.internalId,
            status: EInstanceStatus.CREATING,
            ipv4: instance.ipv4,
            login: instance.login,
            password: instance.password
        })
    }

    async start(instance: InstanceEntity) {
        const action = this.providerFactory.createInstanceStarter(instance.provider)
        await action(instance.internalId)

        await this.repository.update(instance.id, {
            internalId: instance.internalId,
            status: EInstanceStatus.STARTING
        })
    }

    async stop(instance: InstanceEntity) {
        const action = this.providerFactory.createInstanceStopper(instance.provider)
        await action(instance.internalId)

        await this.repository.update(instance.id, {
            internalId: instance.internalId,
            status: EInstanceStatus.STOPPED
        })
    }

    async reboot(instance: InstanceEntity) {
        const action = this.providerFactory.createInstanceRebooter(instance.provider)
        await action(instance.internalId)

        await this.repository.update(instance.id, {
            internalId: instance.internalId,
            status: EInstanceStatus.REBOOTING
        })
    }

    async remove(instance: InstanceEntity) {
        const action = this.providerFactory.createInstanceRemover(instance.provider)
        await action(instance.internalId)

        await this.repository.update(instance.id, {
            internalId: instance.internalId,
            status: EInstanceStatus.REMOVED
        })
    }
}
