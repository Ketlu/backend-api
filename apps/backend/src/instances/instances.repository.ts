import { EntityRepository, Repository } from 'typeorm'
import { InstanceEntity } from './instances.entity'

@EntityRepository(InstanceEntity)
export class InstanceRepository extends Repository<InstanceEntity> {}
