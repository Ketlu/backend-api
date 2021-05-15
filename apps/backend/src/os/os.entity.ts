import { ApiProperty } from '@nestjs/swagger'
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity()
@Unique(['name'])
export class OsEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id?: number

    @Column()
    @ApiProperty({ type: 'string', example: 'Ubuntu 21.04 x64' })
    name: string
}
