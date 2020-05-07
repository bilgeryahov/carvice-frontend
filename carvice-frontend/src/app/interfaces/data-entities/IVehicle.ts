import { IDataEntity } from './IDataEntity';

export interface IVehicle extends IDataEntity {
    plate: string;
    brand: string;
    model: string;
    type: string;
};
