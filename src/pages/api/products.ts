import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct, IProductsResponse } from '@models/Product';
import { products } from '@mocks/Products.mock';

const getProductsPaged = (offset: number, limit: number): IProduct[] => {
  const res = [];

  for (let i = offset; i < offset + limit; i++) {
    res.push(products[i]);
  }

  return res;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProductsResponse>
): void {
  const perPage = 20;
  const currPage = Number(req.query.page) || 1;

  try {
    res.status(200).json({
      entities: getProductsPaged(perPage * (currPage - 1), perPage),
      currPage: currPage,
      pageCount: Math.ceil(products.length / perPage),
    });
  } catch (err) {
    res.status(404).json({
      message: "Smth went wrong"
    });
  }
}
