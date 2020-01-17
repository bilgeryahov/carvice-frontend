import { Service } from './service.model';
import { BaseModel } from './base.model';

export class Vehicle extends BaseModel {
    brand: string;
    model: string;
    type: string;
    plate: string;
    vin: string;
    engine: string;
    services: Service[];
}
