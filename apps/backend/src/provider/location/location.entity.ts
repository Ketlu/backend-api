import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm'
import { CityLocationEntity } from '../../locations/city.entity'
import { ProviderEntity } from '../provider.entity'

@Entity()
@Unique(['providerId', 'internalName'])
export class ProviderLocationEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id?: number

    @Column()
    @ApiProperty({ type: 'string', example: 'ams' })
    internalName: string

    @Column('integer')
    @Exclude()
    cityId: number

    @Column('integer')
    @Exclude()
    providerId: number

    @ManyToOne(() => ProviderEntity)
    @ApiProperty({ type: ProviderEntity })
    provider?: ProviderEntity

    @ManyToOne(() => CityLocationEntity)
    @ApiProperty({ type: CityLocationEntity })
    city?: CityLocationEntity
}
