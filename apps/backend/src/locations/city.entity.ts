import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { CountryLocationEntity } from './country.entity'

@Entity()
@Unique(['name', 'countryId'])
export class CityLocationEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id: number

    @Column()
    @ApiProperty({ type: 'string', example: 'Amsterdam' })
    name: string

    @Column('integer')
    @Exclude()
    countryId: number

    @ManyToOne(() => CountryLocationEntity)
    @ApiProperty({ type: CountryLocationEntity })
    country: CountryLocationEntity
}
