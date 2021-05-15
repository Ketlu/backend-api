import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AxiosInstance } from 'axios'
import { Repository } from 'typeorm'
import { ProviderEntity } from '../provider.entity'
import { ProviderLocationEntity } from './location.entity'

@Injectable()
export class ProviderLocationService {
    private readonly axiosClient: AxiosInstance

    constructor(
        @InjectRepository(ProviderLocationEntity)
        private readonly repository: Repository<ProviderLocationEntity>
    ) {}

    getByInternalName(internalName: string, provider: ProviderEntity) {
        return this.repository.findOne({ internalName, providerId: provider.id })
    }

    getById(id: number) {
        return this.repository.findOneOrFail(id)
    }
}
