import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common'
import { InstancesListService } from './list.service'

@Controller('instances')
export class InstancesListController {
    constructor(private readonly service: InstancesListService) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    list() {
        return this.service.list()
    }
}
