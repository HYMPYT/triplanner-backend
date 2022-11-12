import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Locale } from 'locale-enum';
import { CAR_TYPE } from 'src/common/enums/cars/car.enum';
import { CURRENCY_CODE } from 'src/common/enums/cities/currency-code.enum';
import { HOTEL_ROOM_TYPE, STAY_TYPE } from 'src/common/enums/stays/stay.enum';
import { FLIGHT_SEAT_CLASS, RAILWAY_CARRIAGE_TYPE, RAILWAY_SEAT_CLASS, TICKET_TYPE } from 'src/common/enums/tickets/ticket.enum';
import { USER_ROLES, USER_STATUS } from 'src/common/enums/users/user.enum';

@ApiTags('Types')
@Controller('api/types')
export class TypesController {
	@ApiOperation({ summary: 'types of the tickets' })
	@Get('/ticket/types')
	getTicketTypes() {
		return TICKET_TYPE
	}
	@ApiOperation({ summary: 'onboard seat class' })
	@Get('/flight/class')
	getFlightTicketSeatClass() {
		return FLIGHT_SEAT_CLASS
	}
	@ApiOperation({ summary: 'railway seat class' })
	@Get('/railway/class')
	getRailwayTicketSeatClass() {
		return RAILWAY_SEAT_CLASS
	}
	@ApiOperation({ summary: 'railway carriage type' })
	@Get('/railway/types')
	getRailwayCarriageTypes() {
		return RAILWAY_CARRIAGE_TYPE
	}
	@ApiOperation({ summary: 'types of the stays' })
	@Get('/stay/types')
	getStayTypes() {
		return STAY_TYPE
	}
	@ApiOperation({ summary: 'types of the hotel rooms' })
	@Get('/room/types')
	getHotelRoomTypes() {
		return HOTEL_ROOM_TYPE
	}
	@ApiOperation({ summary: 'currency codes' })
	@Get('/city/currency')
	getCurrencyCodes() {
		return CURRENCY_CODE
	}
	@ApiOperation({ summary: 'locale' })
	@Get('/city/locale')
	getLocale() {
		return Locale
	}
    @ApiOperation({ summary: 'types of the cars' })
	@Get('/car/types')
	getCarTypes() {
		return CAR_TYPE
	}
    @ApiOperation({ summary: 'user roles' })
	@Get('/user/roles')
	getUserRoles() {
		return USER_ROLES
	}
    @ApiOperation({ summary: 'user statuses' })
	@Get('/user/status')
	getUserStatuses() {
		return USER_STATUS
	}
}
