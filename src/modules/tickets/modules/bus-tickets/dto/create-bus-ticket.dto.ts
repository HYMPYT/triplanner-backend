import { ApiProperty } from "@nestjs/swagger"

export class CreateBusTicketDto {
    @ApiProperty({ default: '123' })
    number: string
}