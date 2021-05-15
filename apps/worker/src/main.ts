import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { InstancesPendingApp } from './instances/pending/pending.app'
import { InstancesStatusApp } from './instances/status/status.app'

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule)

    const createApp = await app.resolve(InstancesPendingApp)
    createApp.beginPool()

    const statusApp = await app.resolve(InstancesStatusApp)
    statusApp.beginPool()
}

bootstrap()
