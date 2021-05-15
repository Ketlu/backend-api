import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProviderPlanEntity } from './plan.entity'

@Controller()
export class ProviderPlanController {
    constructor(
        @InjectRepository(ProviderPlanEntity)
        private readonly repository: Repository<ProviderPlanEntity>
    ) {}

    @Get('providers/:providerId/plans')
    @UseInterceptors(ClassSerializerInterceptor)
    base(@Param('providerId') providerId: string) {
        return this.repository.find({
            relations: ['locations', 'locations.city', 'locations.city.country'],
            where: { providerId }
        })
    }
}
