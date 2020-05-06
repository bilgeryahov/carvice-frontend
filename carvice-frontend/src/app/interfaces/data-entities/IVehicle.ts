import { IDataEntity } from './IDataEntity';
import { CarTypes } from '../../enums/car-types.enum';

export interface IVehicle extends IDataEntity {
    plate: string;
    brand: string;
    model: string;
    type: CarTypes;
};
