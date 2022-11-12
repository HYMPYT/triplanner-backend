import { ApiProperty } from "@nestjs/swagger"
import { TICKET_TYPE } from "src/common/enums/tickets/ticket.enum"

export class SearchQueryParamsDto {
    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644' })
    fromId: string
    @ApiProperty({ default: '3564a7be-7e8f-4c1a-9662-8d0418e99644', required: false })
    toId?: string
    @ApiProperty({ default: '11/11/2022', required: false })
    dDate?: string
    @ApiProperty({ default: '11/11/2022', required: false })
    rDate?: string
    @ApiProperty({ enum: TICKET_TYPE, default: TICKET_TYPE.FLIGHT, required: false })
    type?: TICKET_TYPE
}