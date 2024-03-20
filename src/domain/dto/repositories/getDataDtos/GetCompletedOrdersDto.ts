import { type GetVehicleDto } from './GetVehicleDto';

export abstract class GetCompletedOrdersDTO {
  id?: string;
  order_processing_number?: string;
  vehicleData?: GetVehicleDto;
}
