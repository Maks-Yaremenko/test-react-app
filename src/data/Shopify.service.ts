import { IProductsResponse } from '@models/Product';

class Service {
  private readonly apiUrl = `${process.env.API_URL}/products`

  getAll = async (page: number): Promise<IProductsResponse> => {
    const response = await fetch(
      `${this.apiUrl}?page=${page || 1}`
    );

    return response.json();
  };
}

export const ShopifyService = new Service();
