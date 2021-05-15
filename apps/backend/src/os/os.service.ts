import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OsEntity } from './os.entity'

@Injectable()
export class OsService {
    constructor(
        @InjectRepository(OsEntity)
        private readonly repository: Repository<OsEntity>
    ) {}

    async getByName(name: string) {
        await this.repository
            .createQueryBuilder()
            .insert()
            .values({
                name
            })
            .onConflict('DO NOTHING')
            .execute()

        const entity = await this.repository.findOne({
            name
        })

        return entity
    }
}
