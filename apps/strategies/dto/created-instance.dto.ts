export class CreatedInstanceDto {
    internalId: string
    ipv4: string
    login: string
    password: string

    constructor(dto: CreatedInstanceDto) {
        Object.assign(this, dto)
    }
}
