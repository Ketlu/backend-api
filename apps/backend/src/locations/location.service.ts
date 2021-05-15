import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CityLocationEntity } from './city.entity'
import { CountryLocationEntity } from './country.entity'

@Injectable()
export class LocationService {
    private readonly countriesJson: { Code: string; Name: string }[]

    constructor(
        @InjectRepository(CountryLocationEntity)
        private readonly countryRepository: Repository<CountryLocationEntity>,
        @InjectRepository(CityLocationEntity)
        private readonly cityRepository: Repository<CityLocationEntity>
    ) {
        this.countriesJson = require(process.cwd() + '/data/countries.json')
    }

    async getCountryByCode(countryCode: string) {
        const countryName = this.countriesJson.find(x => x.Code === countryCode).Name

        if (!countryName) {
            throw new Error('Couldnt find a country name for provided country code')
        }

        await this.countryRepository
            .createQueryBuilder()
            .insert()
            .values({
                code: countryCode,
                name: countryName
            })
            .onConflict('DO NOTHING')
            .execute()

        const entity = await this.countryRepository.findOne({
            code: countryCode,
            name: countryName
        })

        return entity
    }

    async getCityByNameAndCountry(name: string, country: CountryLocationEntity) {
        await this.cityRepository
            .createQueryBuilder()
            .insert()
            .values({
                name,
                countryId: country.id
            })
            .onConflict('DO NOTHING')
            .execute()

        const entity = await this.cityRepository.findOne({
            name,
            countryId: country.id
        })

        return entity
    }
}
