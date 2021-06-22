import { IProduct } from '@models/Product';

export interface IModalProductDetails {
  show: boolean;
  onClose: () => void;
  entity?: IProduct;
}
