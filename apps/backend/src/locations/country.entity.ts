import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { CityLocationEntity } from './city.entity'

@Entity()
@Unique(['code'])
export class CountryLocationEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'integer', example: 1 })
    id: number

    @Column()
    @ApiProperty({ type: 'string', example: 'Netherlands' })
    name: string

    @Column()
    @ApiProperty({ type: 'string', example: 'NL' })
    code: string

    @OneToMany(
        () => CityLocationEntity,
        city => city.country
    )
    cities: CityLocationEntity[]
}
