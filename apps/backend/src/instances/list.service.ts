import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InstanceRepository } from './instances.repository'

@Injectable()
export class InstancesListService {
    constructor(
        @InjectRepository(InstanceRepository)
        private readonly instanceRepository: InstanceRepository
    ) {}

    list() {
        return this.instanceRepository.find()
    }
}
