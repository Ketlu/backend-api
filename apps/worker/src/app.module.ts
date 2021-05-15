import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InstancesModule } from './instances/instances.module'
import { ProviderFactoryModule } from './provider-factory/factory.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './data/testdb.sqlite',
            entities: ['**/*.entity.ts'],
            synchronize: true
        }),
        ProviderFactoryModule,
        InstancesModule
    ]
})
export class AppModule {}
