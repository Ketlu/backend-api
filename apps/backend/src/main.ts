import { RedocModule, RedocOptions } from 'nestjs-redoc'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { getRepository } from 'typeorm'
import { AppModule } from './app.module'
import { ProviderOsService } from './provider/os/os.service'
import { ProviderEntity } from './provider/provider.entity'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('v1')

    await createDocumentation(app)

    await app.listen(3000)

    const repository = getRepository(ProviderEntity)
    await repository.save({
        id: 1,
        name: 'vultr'
    })

    // const service = await app.resolve(ProviderOsService)
    // await service.populateDatabase()
}

async function createDocumentation(app) {
    const swaggerOptions = new DocumentBuilder()
        .setTitle('Ketlu')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        })
        .build()

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions)

    const redocOptions: RedocOptions = {
        title: 'Ketlu',
        logo: {
            backgroundColor: '#F0F0F0',
            altText: 'Ketlu.com'
        },
        requiredPropsFirst: true,
        sortPropsAlphabetically: false,
        hideDownloadButton: false,
        hideHostname: false
    }

    await RedocModule.setup('/documentation', app, swaggerDocument, redocOptions)
}

bootstrap()
