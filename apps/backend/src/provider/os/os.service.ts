import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OsService } from '../../os/os.service'
import { ProviderEntity } from '../provider.entity'
import { ProviderOsEntity } from './os.entity'

@Injectable()
export class ProviderOsService {
    constructor(
        @InjectRepository(ProviderOsEntity)
        private readonly repository: Repository<ProviderOsEntity>,
        private readonly osService: OsService
    ) {}

    getByGlobalIdAndProvider(id: number, provider: ProviderEntity) {
        return this.repository.findOneOrFail({ where: { osId: id, provider } })
    }
}
