import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OperationNotApplicable } from '../../errors/notapplicable.error'
import { InstanceNotFoundException } from '../errors/notfound.error'
import { InstanceRepository } from '../instances.repository'
import { EInstanceStatus } from '../status.enum'

@Injectable()
export class InstancesStatusService {
    constructor(
        @InjectRepository(InstanceRepository)
        private readonly repository: InstanceRepository
    ) {}

    async start(instanceId: number) {
        const instance = await this.repository.findOneOrFail(instanceId)

        if (!instance) {
            throw new InstanceNotFoundException()
        }

        if (instance.status !== EInstanceStatus.STOPPED) {
            throw new OperationNotApplicable()
        }

        await this.repository.update(instance, { status: EInstanceStatus.START_PENDING })
    }

    async stop(instanceId: number) {
        const instance = await this.repository.findOneOrFail(instanceId)

        if (!instance) {
            throw new InstanceNotFoundException()
        }

        if (instance.status !== EInstanceStatus.STARTED) {
            throw new OperationNotApplicable()
        }

        await this.repository.update(instance, { status: EInstanceStatus.STOP_PENDING })
    }

    async reboot(instanceId: number) {
        const instance = await this.repository.findOneOrFail(instanceId)

        if (!instance) {
            throw new InstanceNotFoundException()
        }

        if (instance.status !== EInstanceStatus.STARTED) {
            throw new OperationNotApplicable()
        }

        await this.repository.update(instance, { status: EInstanceStatus.REBOOT_PENDING })
    }

    async remove(instanceId: number) {
        const instance = await this.repository.findOneOrFail(instanceId)

        if (!instance) {
            throw new InstanceNotFoundException()
        }

        if (instance.status === EInstanceStatus.REMOVE_PENDING) {
            throw new OperationNotApplicable()
        }

        await this.repository.update(instance, { status: EInstanceStatus.REMOVE_PENDING })
    }
}
