import { ApiProperty } from '@nestjs/swagger'

export class InstancesStatusParamDto {
    @ApiProperty({
        type: 'integer',
        description: 'The identifier of the instance in the Ketlu API',
        example: 1
    })
    id: string
}
