import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import axios, { AxiosInstance } from 'axios'
import { Repository } from 'typeorm'
import { OsService } from '../../os/os.service'
import { IVultrOS } from '../../../../strategies/vultr/vultr.interface'
import { ProviderOsEntity } from './os.entity'
import { ProviderEntity } from '../provider.entity'

@Injectable()
export class ProviderOsService {
    private readonly axiosClient: AxiosInstance

    constructor(
        @InjectRepository(ProviderOsEntity)
        private readonly repository: Repository<ProviderOsEntity>,
        private readonly osService: OsService
    ) {
        const apikey = '1'
        this.axiosClient = axios.create({
            baseURL: 'https://api.vultr.com/v2',
            headers: {
                Authorization: 'Bearer ' + apikey
            }
        })
    }

    async populateDatabase(provider: ProviderEntity) {
        const { data } = await this.axiosClient.get<IVultrOS.RootObject>('/os')

        for (const os of data.os) {
            const osEntity = await this.osService.getByName(os.name)

            const localOs: ProviderOsEntity = {
                osId: osEntity.id,
                internalName: os.id.toString(),
                providerId: provider.id
            }
            await this.repository.save(localOs)
        }
    }
}
