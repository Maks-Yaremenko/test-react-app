import * as faker from "faker";
import { IProduct } from '@models/Product';

export const products: IProduct[] = new Array(300)
  .fill(null)
  .map((v, id) => ({
    id,
    name: faker.commerce.productName(),
    picture: faker.image.image(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  }));
