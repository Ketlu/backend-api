import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ProviderLocationEntity } from '../provider/location/location.entity'
import { ProviderOsEntity } from '../provider/os/os.entity'
import { ProviderPlanEntity } from '../provider/plan/plan.entity'
import { ProviderEntity } from '../provider/provider.entity'
import { EInstanceStatus } from './status.enum'

@Entity()
export class InstanceEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id: number

    @Column()
    @ApiProperty({ type: 'string', example: 'My Lovely Instance' })
    name: string

    @Column({ enum: EInstanceStatus, default: EInstanceStatus.CREATION_PENDING })
    @ApiProperty({ enum: EInstanceStatus })
    status: EInstanceStatus

    @Column({ nullable: true })
    @Exclude()
    @ApiProperty({ type: 'string', example: 'cb676a46-66fd-4dfb-b839-443f2e6c0b60', nullable: true })
    internalId: string

    @Column({ nullable: true })
    @ApiProperty({ type: 'string', example: '45.77.31.132', nullable: true })
    ipv4: string | null

    @Column({ nullable: true })
    @ApiProperty({ type: 'string', example: 'root', nullable: true })
    login: string | null

    @Column({ nullable: true })
    @ApiProperty({ type: 'string', example: 'L3x2SkXFFQtkdevd', nullable: true })
    password: string | null

    @ManyToOne(() => ProviderEntity)
    @ApiProperty({ type: ProviderEntity })
    provider: ProviderEntity

    @ManyToOne(() => ProviderPlanEntity)
    @ApiProperty({ type: ProviderPlanEntity })
    plan: ProviderPlanEntity

    @ManyToOne(() => ProviderLocationEntity)
    @ApiProperty({ type: ProviderLocationEntity })
    location: ProviderLocationEntity

    @ManyToOne(() => ProviderOsEntity)
    @ApiProperty({ type: ProviderOsEntity })
    os: ProviderOsEntity
}
