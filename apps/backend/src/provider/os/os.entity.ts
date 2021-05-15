import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm'
import { OsEntity } from '../../os/os.entity'
import { ProviderEntity } from '../provider.entity'

@Entity()
@Unique(['providerId', 'internalName'])
export class ProviderOsEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    @ApiProperty({ type: 'string', example: '445' })
    internalName: string

    @Column('integer')
    @Exclude()
    osId: number

    @Column('integer')
    @Exclude()
    providerId: number

    @ManyToOne(() => ProviderEntity)
    provider?: ProviderEntity

    @ManyToOne(() => OsEntity)
    @ApiProperty({ type: OsEntity })
    os?: OsEntity
}
