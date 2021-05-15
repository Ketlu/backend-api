import { ApiProperty } from '@nestjs/swagger'

export class InstancesCreateDto {
    @ApiProperty({
        type: 'string',
        description: 'The user defined name of the instance',
        example: 'My Lovely Instance'
    })
    name: string

    @ApiProperty({
        type: 'integer',
        description: 'The identifier of the Provider where instance will be created',
        example: 1
    })
    providerId: number

    @ApiProperty({
        type: 'integer',
        description: 'The Plan ID (in a provider scope) which will be used to create the instance',
        example: 1
    })
    planId: number

    @ApiProperty({
        type: 'integer',
        description: 'The Location ID (in a provider scope) where instance will be created',
        example: 1
    })
    locationId: number

    @ApiProperty({
        type: 'integer',
        description: 'The global ID of Operating System which will be used in the instance',
        example: 1
    })
    osId: number
}
