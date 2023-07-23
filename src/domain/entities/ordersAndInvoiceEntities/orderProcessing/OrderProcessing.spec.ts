import { Route } from '../../../entities/routeEntities/Route/Route';
import { Vehicle } from '../../../entities/vehicleEntities/vehicle/Vehicle';
import { VehicleBrand } from '../../../entities/vehicleEntities/vehicleBrand/VehicleBrand';
import { VehicleModel } from '../../../entities/vehicleEntities/vehicleModel/VehicleModel';
import { OrderProcessing } from './OrderProcessing';

describe('CustomerOrder', () => {
  it('should create customer order', () => {
    const customerOrder = new OrderProcessing({
      Route: new Route({
        cep: '12345678',
        public_place: 'Rua Principal',
        address_number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        uf: 'SP',
        complement: null,
      }),
      start_at: new Date(),
      total_distance: 456.48,
      total_spend_liters: 458.54,
      total_spending_money: 456.54,
      Vehicle: new Vehicle({
        plate: '455445',
        color: 'sdf',
        renavam: '449984944',
        rntrc_expiration: 'dsa',
        year: '455',
        VehicleModel: new VehicleModel({
          axles: 4,
          capacity_max: 40_000,
          name: 'Unão',
          weight: 4000,
          VehicleBrand: new VehicleBrand({
            name: 'Ford',
          }),
        }),
      }),
      plate: null,
      route_id: null,
      end_at: null,
    });
    expect(customerOrder).toBeTruthy();
  });
});
