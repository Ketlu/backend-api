import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CityLocationEntity } from './city.entity'
import { CountryLocationEntity } from './country.entity'
import { LocationController } from './location.controller'
import { LocationService } from './location.service'

@Module({
    imports: [TypeOrmModule.forFeature([CountryLocationEntity, CityLocationEntity])],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [TypeOrmModule, LocationService]
})
export class LocationModule {}
