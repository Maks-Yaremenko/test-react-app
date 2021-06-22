import { IProduct } from '@models/Product';

export interface ICardProduct {
  entity: IProduct;
  clickEvent: (entity: IProduct) => {};
}
