import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CityLocationEntity } from './city.entity'
import { CountryLocationEntity } from './country.entity'

@Controller('locations')
export class LocationController {
    constructor(
        @InjectRepository(CountryLocationEntity)
        private readonly countryLocationRepository: Repository<CountryLocationEntity>,
        @InjectRepository(CityLocationEntity)
        private readonly cityLocationEntity: Repository<CityLocationEntity>
    ) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    base() {
        return this.countryLocationRepository.find({ relations: ['cities'] })
    }
}
