import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, Unique, JoinTable } from 'typeorm'
import { ProviderLocationEntity } from '../location/location.entity'
import { ProviderEntity } from '../provider.entity'

@Entity()
@Unique(['providerId', 'internalName'])
export class ProviderPlanEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id?: number

    @Column()
    @ApiProperty({ type: 'string', example: 'vc2-2c-1gb' })
    internalName: string

    @Column()
    @ApiProperty({ type: 'integer', example: 2 })
    vcpusCount: number

    @Column()
    @ApiProperty({ type: 'integer', example: 1024 })
    ramMegabytes: number

    @Column()
    @ApiProperty({ type: 'integer', example: 25 })
    diskGigabytes: number

    @Column()
    @ApiProperty({ type: 'integer', examples: [100, null], nullable: true })
    bandwidthGigabytes: number | null

    @Column('integer')
    @ApiProperty({ type: 'integer', example: 100 })
    monthlyCostUsdCents: number

    @Column('integer')
    @Exclude()
    providerId: number

    @ManyToOne(() => ProviderEntity)
    provider?: ProviderEntity

    @ManyToMany(() => ProviderLocationEntity)
    @JoinTable()
    locations?: ProviderLocationEntity[]
}
