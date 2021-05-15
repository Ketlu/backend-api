import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProviderPlanEntity } from './plan.entity'

@Injectable()
export class ProviderPlanService {
    constructor(
        @InjectRepository(ProviderPlanEntity)
        private readonly repository: Repository<ProviderPlanEntity>
    ) {}

    getById(id: number) {
        return this.repository.findOneOrFail({
            relations: ['locations'],
            where: { id }
        })
    }
}
