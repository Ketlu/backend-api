import { ProviderLocationEntity } from '../../../backend/src/provider/location/location.entity'
import { ProviderOsEntity } from '../../../backend/src/provider/os/os.entity'
import { ProviderPlanEntity } from '../../../backend/src/provider/plan/plan.entity'
import { StrategyCreateInstanceDto } from '../../../strategies/dto/create-instance.dto'
import { ProviderStrategy } from '../../../strategies/strategy.interface'

export class InstanceBuilder {
    private location: ProviderLocationEntity
    private plan: ProviderPlanEntity
    private os: ProviderOsEntity
    private name: string

    constructor(private readonly strategy: ProviderStrategy) {
        if (!strategy) {
            throw new Error('Strategy is required')
        }
    }

    setName(name: string) {
        this.name = name
    }

    setLocation(location: ProviderLocationEntity) {
        this.location = location
    }

    setPlan(plan: ProviderPlanEntity) {
        this.plan = plan
    }

    setOperatingSystem(os: ProviderOsEntity) {
        this.os = os
    }

    execute() {
        if (!this.name) {
            throw new Error('Name is required')
        }

        if (!this.location) {
            throw new Error('Location is required')
        }

        if (!this.plan) {
            throw new Error('Plan is required')
        }

        if (!this.os) {
            throw new Error('OperatingSystem is required')
        }

        const dto: StrategyCreateInstanceDto = {
            plan: this.plan,
            location: this.location,
            os: this.os,
            name: this.name
        }
        return this.strategy.createInstance(dto)
    }
}
