import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class ProviderEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id: number

    @Column()
    @ApiProperty({ type: 'string', example: 'vultr' })
    name: string
}
