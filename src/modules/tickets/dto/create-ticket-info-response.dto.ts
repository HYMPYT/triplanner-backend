import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketInfoDto {
    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    ticketInfoId: string
}