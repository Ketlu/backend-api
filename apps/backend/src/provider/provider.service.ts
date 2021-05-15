import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProviderEntity } from './provider.entity'

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(ProviderEntity)
        private readonly repository: Repository<ProviderEntity>
    ) {}

    getById(id: number) {
        return this.repository.findOneOrFail(id)
    }
}
