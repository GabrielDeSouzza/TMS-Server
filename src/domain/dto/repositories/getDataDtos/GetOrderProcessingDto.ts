import { type GetVehicleDto } from './GetVehicleDto';

export abstract class GetOrderProcessingDTO {
  id?: string;
  order_processing_number?: string;
  vehicleData?: GetVehicleDto;
}
