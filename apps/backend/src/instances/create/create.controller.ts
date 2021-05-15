import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InstanceEntity } from '../instances.entity'
import { InstancesCreateService } from './create.service'
import { InstancesCreateDto } from './dto/create.dto'

@Controller('instances/create')
@ApiTags('Instances')
export class InstancesCreateController {
    constructor(private readonly service: InstancesCreateService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new one' })
    @ApiBody({ type: InstancesCreateDto })
    @ApiResponse({ status: 201, type: InstanceEntity, description: 'Returns a newly created instance' })
    async create(@Body() createDto: InstancesCreateDto) {
        await this.service.create(createDto)
    }
}
