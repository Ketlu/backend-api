import axios, { AxiosInstance } from 'axios'
import { EInstanceStatus } from '../../backend/src/instances/status.enum'
import { StrategyCreateInstanceDto } from '../dto/create-instance.dto'
import { CreatedInstanceDto } from '../dto/created-instance.dto'
import { FetchedInstanceDto } from '../dto/fetched-instance.dto'
import { ProviderStrategy } from '../strategy.interface'
import { IVultrCreateInstance, IVultrGetInstance, TVultrCreateInstance } from './vultr.interface'

export class VultrStrategy implements ProviderStrategy {
    private readonly axiosClient: AxiosInstance

    constructor(options: { apiKey: string }) {
        this.axiosClient = axios.create({
            baseURL: 'https://api.vultr.com/v2',
            headers: {
                Authorization: 'Bearer ' + options.apiKey
            }
        })
    }

    async createInstance(builder: StrategyCreateInstanceDto) {
        const postParams: TVultrCreateInstance = {
            os_id: parseInt(builder.os.internalName),
            region: builder.location.internalName,
            plan: builder.plan.internalName,
            label: builder.name
        }

        const {
            data: { instance }
        } = await this.axiosClient.post<IVultrCreateInstance.RootObject>('/instances', postParams)

        const response = new CreatedInstanceDto({
            internalId: instance.id,
            ipv4: instance.main_ip,
            login: 'root',
            password: instance.default_password
        })

        return response
    }

    async getInstance(internalId: string) {
        const {
            data: { instance }
        } = await this.axiosClient.get<IVultrGetInstance.RootObject>('/instances/' + internalId)

        let status = EInstanceStatus.CREATING

        if (instance.status === 'active') {
            status = EInstanceStatus.STARTED
        }

        if (instance.status === 'rebooting') {
            status = EInstanceStatus.REBOOTING
        }

        if (instance.status === 'halted') {
            status = EInstanceStatus.STOPPED
        }

        const response = new FetchedInstanceDto({
            internalId: instance.id,
            ipv4: instance.main_ip,
            status
        })

        return response
    }

    async stopInstance(internalId: string) {
        const postParams = {
            instance_ids: [internalId]
        }
        await this.axiosClient.post('/instances/halt', postParams)
        console.log('stop')
        return true
    }

    async startInstance(internalId: string) {
        const postParams = {
            instance_ids: [internalId]
        }
        await this.axiosClient.post('/instances/start', postParams)
        console.log('start')
        return true
    }

    async rebootInstance(internalId: string) {
        const postParams = {
            instance_ids: [internalId]
        }
        await this.axiosClient.post('/instances/reboot', postParams)
        console.log('reboot')
        return true
    }

    async removeInstance(internalId: string) {
        await this.axiosClient.delete('/instances/' + internalId)
        console.log('remove')
        return true
    }
}
