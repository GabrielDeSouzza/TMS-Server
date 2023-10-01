import { Route } from '../../../entities/routeEntities/Route/Route';
import { Vehicle } from '../../vehicle/vehicle/Vehicle';
import { VehicleModel } from '../../vehicle/vehicleModel/VehicleModel';
import { OrderProcessing } from './OrderProcessing';

describe('OrderProcessing', () => {
  it('should create order processing', () => {
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
        created_by: 'test',
        updated_by: 'test',
        VehicleModel: new VehicleModel({
          axles: 4,
          capacity_max: 40_000,
          capacity_per_axle: 0,
          name: 'Unão',
          weight: 4000,
          created_by: 'test',
          updated_by: 'test',
        }),
      }),
      plate: null,
      route_id: null,
      end_at: null,
    });
    expect(customerOrder).toBeTruthy();
  });
});
