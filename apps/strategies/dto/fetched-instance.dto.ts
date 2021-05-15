import { EInstanceStatus } from '../../backend/src/instances/status.enum'

export class FetchedInstanceDto {
    internalId: string
    ipv4: string
    status: EInstanceStatus

    constructor(dto: FetchedInstanceDto) {
        Object.assign(this, dto)
    }
}
