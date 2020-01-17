import { BaseModel } from './base.model';

export class Service extends BaseModel {
    createdAt: Date;
    executedAt: Date;
    mileageAt: number;
    details: string;
    price: number;
}
