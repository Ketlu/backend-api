import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { LocationModule } from './locations/location.module'
import { OsModule } from './os/os.module'
import { ProviderModule } from './provider/provider.module'
import { InstancesModule } from './instances/instances.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './data/testdb.sqlite',
            entities: ['**/*.entity.ts'],
            synchronize: true
        }),
        LocationModule,
        ProviderModule,
        OsModule,
        InstancesModule
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
