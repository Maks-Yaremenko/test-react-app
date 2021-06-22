import { ReactElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Image from "next/image";
import styles from "./ModalProductDetails.module.scss";
import { IModalProductDetails } from './ModalProductDetails.models';

export function ModalProductDetails({ show, onClose, entity }: IModalProductDetails): ReactElement | null {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!entity || !isBrowser) {
    return null;
  }

  const { name, picture, price, description } = entity;

  const handleCloseClick = (event: any): void => {
    event.preventDefault();
    onClose();
  };

  const template = (): ReactElement => {
    return <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Product details</h2>
          <a href="#" className={styles.closeButton} role="button" onClick={handleCloseClick}></a>
        </div>
        <div className={styles.info}>
          <div className={styles.image}>
            <Image
              src={picture}
              alt="product picture"
              layout={"fill"}
              objectFit={"fill"}
            />
          </div>
          <div>
            <p>Title: {name}</p>
            <p>Price: {price}</p>
          </div>
        </div>
        <p>Description: { description }</p>
      </div>
    </div>
  }

  const modalContent = show ? template() : null;
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return ReactDOM.createPortal(modalContent, modalRoot);
};
