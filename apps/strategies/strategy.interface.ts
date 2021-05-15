import { StrategyCreateInstanceDto } from './dto/create-instance.dto'
import { CreatedInstanceDto } from './dto/created-instance.dto'
import { FetchedInstanceDto } from './dto/fetched-instance.dto'

export interface ProviderStrategy {
    createInstance(builder: StrategyCreateInstanceDto): Promise<CreatedInstanceDto>
    getInstance(internalId: string): Promise<FetchedInstanceDto>
    stopInstance(internalId: string): Promise<boolean>
    startInstance(internalId: string): Promise<boolean>
    rebootInstance(internalId: string): Promise<boolean>
    removeInstance(internalId: string): Promise<boolean>
}
