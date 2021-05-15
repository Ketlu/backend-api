import { Injectable } from '@nestjs/common'

import { ProviderEntity } from '../../../backend/src/provider/provider.entity'
import { InstanceBuilder } from './instance-builder.class'
import { ProviderStrategy } from '../../../strategies/strategy.interface'
import { VultrStrategy } from '../../../strategies/vultr/vultr.strategy'

@Injectable()
export class ProviderFactoryService {
    private getStrategy(provider: ProviderEntity): ProviderStrategy {
        let strategy: ProviderStrategy

        if (provider.name === 'vultr') {
            strategy = new VultrStrategy({
                apiKey: process.env.VULTR_API_KEY
            })
        }

        if (!strategy) {
            throw new Error(`ProviderStrategy for "${provider.name}" is not found`)
        }

        return strategy
    }

    createInstanceBuilder(provider: ProviderEntity) {
        const strategy = this.getStrategy(provider)
        return new InstanceBuilder(strategy)
    }

    createInstanceUpdater(provider: ProviderEntity) {
        const strategy = this.getStrategy(provider)
        return function(internalId: string) {
            return strategy.getInstance(internalId)
        }
    }

    createInstanceRemover(provider: ProviderEntity) {
        const strategy = this.getStrategy(provider)
        return function(internalId: string) {
            return strategy.removeInstance(internalId)
        }
    }

    createInstanceStarter(provider: ProviderEntity) {
        const strategy = this.getStrategy(provider)
        return function(internalId: string) {
            return strategy.startInstance(internalId)
        }
    }

    createInstanceStopper(provider: ProviderEntity) {
        const strategy = this.getStrategy(provider)
        return function(internalId: string) {
            return strategy.stopInstance(internalId)
        }
    }

    createInstanceRebooter(provider: ProviderEntity) {
        const strategy = this.getStrategy(provider)
        return function(internalId: string) {
            return strategy.rebootInstance(internalId)
        }
    }
}
