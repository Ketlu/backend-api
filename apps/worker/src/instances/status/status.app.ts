import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InstanceEntity } from '../../../../backend/src/instances/instances.entity'
import { InstanceRepository } from '../../../../backend/src/instances/instances.repository'
import { EInstanceStatus } from '../../../../backend/src/instances/status.enum'
import { ProviderFactoryService } from '../../provider-factory/factory.service'
import { In } from 'typeorm'
import * as sleep from 'sleep-promise'

@Injectable()
export class InstancesStatusApp {
    constructor(
        private readonly providerFactory: ProviderFactoryService,

        @InjectRepository(InstanceRepository)
        private readonly repository: InstanceRepository
    ) {}

    async beginPool() {
        // Статусы, при которых требуется переодическое обновление состояния
        const updateStatuses = [
            EInstanceStatus.CREATING,
            EInstanceStatus.REBOOTING,
            EInstanceStatus.REMOVING,
            EInstanceStatus.STOPPING
        ]

        // Получаем созданные инстансы
        const instances = await this.repository.find({
            relations: ['provider', 'location', 'plan', 'os'],
            where: {
                status: In(updateStatuses)
            }
        })

        for (const instance of instances) {
            // Проверяем обновления у провайдера
            await this.update(instance)

            // Спим 300мс
            await sleep(300)

            console.log(`Instance ${instance.id} was updated`)
        }

        // Спим 1000мс
        await sleep(1000)

        this.beginPool()
    }

    async update(entity: InstanceEntity) {
        // Получаем новый экземпляр функции для получения состояния инстанса
        const updater = this.providerFactory.createInstanceUpdater(entity.provider)

        // Делаем запрос к API провайдера
        const instance = await updater(entity.internalId)

        console.log(instance)

        // Обновляем состояние в нашей базе
        await this.repository.update(entity.id, {
            internalId: instance.internalId,
            status: instance.status,
            ipv4: instance.ipv4
        })
    }
}
