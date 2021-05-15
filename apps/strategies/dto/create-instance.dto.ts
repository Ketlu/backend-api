import { ProviderLocationEntity } from '../../backend/src/provider/location/location.entity'
import { ProviderOsEntity } from '../../backend/src/provider/os/os.entity'
import { ProviderPlanEntity } from '../../backend/src/provider/plan/plan.entity'

export class StrategyCreateInstanceDto {
    location: ProviderLocationEntity
    plan: ProviderPlanEntity
    os: ProviderOsEntity
    name: string
}
