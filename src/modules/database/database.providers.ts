import { PROVIDERS } from 'src/providers/providers.enum';
import { DataSource } from 'typeorm';
import { Amenity } from '../amenities/entities/amenity.entity';
import { Car } from '../cars/entities/car.entity';
import { RentedCar } from '../cars/modules/rented-cars/entities/rented-car.entity';
import { City } from '../cities/entities/city.entity';
import { Company } from '../companies/entities/company.entity';
import { Country } from '../countries/entities/country.entity';
import { Entertainment } from '../entertainment/entities/entertainment.entity';
import { OrderedEntertainment } from '../entertainment/modules/ordered-entertainment/entities/ordered-entertainment.entity';
import { Image } from '../images/entities/image.entity';
import { Stay } from '../stays/entities/stay.entity';
import { Hotel } from '../stays/modules/hotels/entities/hotel.entity';
import { OrderedStay } from '../stays/modules/ordered-stays/entities/ordered-stay.entity';
import { Room } from '../stays/modules/rooms/entities/room.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { BusTicket } from '../tickets/modules/bus-tickets/entities/bus-ticket.entity';
import { FlightTicket } from '../tickets/modules/flight-tickets/entities/flight-ticket.entity';
import { OrderedTicket } from '../tickets/modules/ordered-tickets/entities/ordered-ticket.entity';
import { RailwayTicket } from '../tickets/modules/railway-tickets/entities/railway-ticket.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_CONNECTION,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'triplanner',
        entities: [
          User,

          Ticket,
          FlightTicket,
          BusTicket,
          RailwayTicket,
          OrderedTicket,

          Stay,
          Hotel,
          Room,
          OrderedStay,

          Entertainment,
          OrderedEntertainment,

          Car,
          RentedCar,

          Country,
          City,
          Company,
          Amenity,
          Image,
        ],
        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];