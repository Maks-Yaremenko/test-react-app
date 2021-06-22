export interface IProduct {
  id: number;
  picture: string;
  name: string;
  price: string;
  description: string;
}

export type IProductsResponse = IProductsResSuccess | IProductsResError;

export class IProductsResSuccess {
  entities!: IProduct[];
  currPage!: number;
  pageCount!: number;
}

export class IProductsResError {
  message!: string;
}
