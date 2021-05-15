import { Controller, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { InstancesStatusParamDto } from './dto/param.dto'
import { InstancesStatusService } from './status.service'

@Controller('instances')
export class InstancesStatusController {
    constructor(private readonly instanceStatusService: InstancesStatusService) {}

    @Post('start/:id')
    @ApiOperation({ summary: 'Start the instance' })
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiResponse({ status: 201 })
    async start(@Param() params: InstancesStatusParamDto) {
        await this.instanceStatusService.start(+params.id)
        return
    }

    @Post('stop/:id')
    @ApiOperation({ summary: 'Stop the instance' })
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiResponse({ status: 201 })
    async stop(@Param() params: InstancesStatusParamDto) {
        await this.instanceStatusService.stop(+params.id)
        return
    }

    @Post('reboot/:id')
    @ApiOperation({ summary: 'Reboot the instance' })
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiResponse({ status: 201 })
    async reboot(@Param() params: InstancesStatusParamDto) {
        await this.instanceStatusService.reboot(+params.id)
        return
    }

    @Post('remove/:id')
    @ApiOperation({ summary: 'Remove the instance' })
    @ApiParam({ name: 'id', type: 'integer' })
    @ApiResponse({ status: 201 })
    async remove(@Param() params: InstancesStatusParamDto) {
        await this.instanceStatusService.remove(+params.id)
        return
    }
}
