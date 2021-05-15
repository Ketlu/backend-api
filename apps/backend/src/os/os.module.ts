import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OsEntity } from './os.entity'
import { OsService } from './os.service'

@Module({
    imports: [TypeOrmModule.forFeature([OsEntity])],
    providers: [OsService],
    exports: [TypeOrmModule, OsService]
})
export class OsModule {}
