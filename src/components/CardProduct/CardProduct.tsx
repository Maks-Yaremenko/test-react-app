import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import Image from "next/image";
import styles from "./CardProduct.module.scss";

import { ICardProduct } from './CardProduct.model';

export const CardProduct: FunctionComponent<ICardProduct> = (
  props: PropsWithChildren<ICardProduct>
): ReactElement => {
  const { picture, name, price } = props.entity;

  return (
    <div className={styles.container} onClick={() => props.clickEvent(props.entity)}>
      <div className={styles.image}>
        <Image
          src={picture}
          alt="product picture"
          layout={"fill"}
          objectFit={"fill"}
        />
      </div>
      <p>{name}</p>
      <p>{price}</p>
    </div>
  );
};
