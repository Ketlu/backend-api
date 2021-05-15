import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios, { AxiosInstance } from 'axios'
import { Repository } from 'typeorm'
import { IVultrPlan } from '../../../../strategies/vultr/vultr.interface'
import { ProviderLocationEntity } from '../location/location.entity'
import { ProviderLocationService } from '../location/location.service'
import { ProviderPlanEntity } from './plan.entity'

@Injectable()
export class ProviderPlanService {
    private readonly axiosClient: AxiosInstance

    private readonly vultrProviderKey = 1

    constructor(
        @InjectRepository(ProviderPlanEntity)
        private readonly repository: Repository<ProviderPlanEntity>,
        private readonly providerLocationService: ProviderLocationService
    ) {
        const apikey = '1'
        this.axiosClient = axios.create({
            baseURL: 'https://api.vultr.com/v2',
            headers: {
                Authorization: 'Bearer ' + apikey
            }
        })
    }

    async populateDatabase() {
        const {
            data: { plans }
        } = await this.axiosClient.get<IVultrPlan.RootObject>('/plans')

        for (const plan of plans) {
            const localLocations = new Array<ProviderLocationEntity>()

            for (const location of plan.locations) {
                const entity = await this.providerLocationService.getByInternalName(location)
                localLocations.push(entity)
            }

            const localPlan: ProviderPlanEntity = {
                internalName: plan.id,
                vcpusCount: plan.vcpu_count,
                ramMegabytes: plan.ram,
                diskGigabytes: plan.disk,
                bandwidthGigabytes: plan.bandwidth,
                monthlyCostUsdCents: plan.monthly_cost * 100,
                providerId: this.vultrProviderKey,
                locations: localLocations
            }

            await this.repository.save(localPlan)
        }
    }
}
