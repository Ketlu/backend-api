import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProviderLocationEntity } from '../../provider/location/location.entity'
import { ProviderLocationService } from '../../provider/location/location.service'
import { ProviderOsEntity } from '../../provider/os/os.entity'
import { ProviderOsService } from '../../provider/os/os.service'
import { ProviderPlanEntity } from '../../provider/plan/plan.entity'
import { ProviderPlanService } from '../../provider/plan/plan.service'
import { ProviderService } from '../../provider/provider.service'
import { InstanceRepository } from '../instances.repository'
import { InstancesCreateDto } from './dto/create.dto'

@Injectable()
export class InstancesCreateService {
    constructor(
        private readonly providerService: ProviderService,
        private readonly planService: ProviderPlanService,
        private readonly locationService: ProviderLocationService,
        private readonly osService: ProviderOsService,

        @InjectRepository(InstanceRepository)
        private readonly instanceRepository: InstanceRepository
    ) {}

    async create(dto: InstancesCreateDto) {
        const provider = await this.providerService.getById(dto.providerId)
        const location: ProviderLocationEntity = await this.locationService.getById(dto.locationId)
        const plan: ProviderPlanEntity = await this.planService.getById(dto.planId)
        const os: ProviderOsEntity = await this.osService.getByGlobalIdAndProvider(dto.osId, provider)

        if (provider.id !== location.providerId) {
            throw new Error('Provided Location is not assigned with provided Provider')
        }

        if (provider.id !== plan.providerId) {
            throw new Error('Provided Plan is not assigned with provided Provider')
        }

        if (provider.id !== os.providerId) {
            throw new Error('Provided OS is not assigned with provided Provider')
        }

        if (!plan.locations.find(x => x.id === location.id)) {
            throw new Error('Provided Location is not assigned with provided Plan')
        }

        const instance = await this.instanceRepository.save({
            name: dto.name,
            provider,
            location,
            plan,
            os
        })

        return instance
    }
}
