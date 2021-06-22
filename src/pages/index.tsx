import { ReactElement, useEffect, useState } from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import styles from "./index.module.scss";

import { useLoading } from '@hooks/useLoading';
import { ShopifyService } from '@data/Shopify.service';
import { GridList } from '@components/GridList/GridList';
import { CardProduct } from '@components/CardProduct/CardProduct';
import { IProduct, IProductsResError, IProductsResponse } from '@models/Product';
import { ModalProductDetails } from '@components/ModalProductDetails/ModalProductDetails';

const ProductsList = GridList(CardProduct);

export default function Index(props: { products: IProductsResponse }): ReactElement {
  const { products } = props;
  const router = useRouter();
  const { loading, startLoading, stopLoading } = useLoading(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<IProduct>();

  useEffect(() => stopLoading(), [products]);

  const nextPage = (): void => {
    if (products instanceof IProductsResError || products.currPage === products.pageCount) {
      return;
    }

    startLoading();
    const { pathname } = router;
    const nextPage = ++products.currPage;

    router.push(
      {
        pathname,
        query: { page: nextPage },
      },
      pathname,
      {
        scroll: false,
      }
    );
  }

  const showProductDetailsModal = (entity: IProduct): void => {
    setSelectedEntity(entity);
    setShowModal(true);
  }

  const getGridListTemplate = (
    products: IProductsResponse
  ): ReactElement | null => {
    if (products instanceof IProductsResError || !products.entities) {
      return null;
    }

    return <ProductsList
      dataSource={products}
      infiniteScroll={true}
      nextPage={nextPage}
      clickEvent={showProductDetailsModal}
    />;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cloudshelf</title>
        <meta name="description" content="Cloudshelf" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ModalProductDetails
          entity={selectedEntity}
          onClose={() => setShowModal(false)}
          show={showModal}
        />
        {getGridListTemplate(products)}
        {loading && <h1>Loading ...</h1>}
      </main>

      <div id="modal-root"></div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  contex: GetServerSidePropsContext
): Promise<{ props: { products: IProductsResponse } }> => {
  const products = await ShopifyService.getAll(Number(contex?.query?.page));

  return {
    props: { products },
  };
};
