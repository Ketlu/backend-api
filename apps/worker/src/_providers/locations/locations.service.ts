import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios, { AxiosInstance } from 'axios'
import { Repository } from 'typeorm'
import { LocationService } from '../../locations/location.service'
import { IVultrRegion } from '../../../../strategies/vultr/vultr.interface'
import { ProviderLocationEntity } from './location.entity'

@Injectable()
export class ProviderLocationService {
    private readonly axiosClient: AxiosInstance

    private readonly vultrProviderKey = 1

    constructor(
        @InjectRepository(ProviderLocationEntity)
        private readonly repository: Repository<ProviderLocationEntity>,
        private readonly locationService: LocationService
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
            data: { regions }
        } = await this.axiosClient.get<IVultrRegion.RootObject>('/regions')

        for (const region of regions) {
            const countryEntity = await this.locationService.getCountryByCode(region.country)
            const cityEntity = await this.locationService.getCityByNameAndCountry(region.city, countryEntity)

            const localRegion: ProviderLocationEntity = {
                cityId: cityEntity.id,
                internalName: region.id,
                providerId: this.vultrProviderKey
            }
            await this.repository.save(localRegion)
        }
    }
}
