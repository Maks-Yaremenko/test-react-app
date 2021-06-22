import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import styles from "./GridList.module.scss";
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { IGridComponent, IGridComponentProps } from './GridList.models';

export function GridList<T>(
  GridTile: FunctionComponent<IGridComponent<T>>
) {
  return function _(props: IGridComponentProps<T>): ReactElement | null {
    const { dataSource, nextPage, infiniteScroll } = props;
    const [entities, setEntities] = useState<T[]>([]);
    const { setElement } = useInfiniteScroll(nextPage);

    useEffect(() => {
      if (Array.isArray(dataSource?.entities)) {
        setEntities(entities.concat(dataSource.entities));
      }
    }, [dataSource]);

    const setLastElemet = (
      element: HTMLHeadingElement | null,
      isLast: boolean
    ): void => {
      if (infiniteScroll && element && isLast) {
        setElement(element);
      }
    };

    const gridTilesTemplate = (): ReactElement[] | null => {
      if (!entities.length) {
        return null;
      }

      return entities.map(
        (entity: any, idx: number): ReactElement => {
          const isLast = entities.length === idx + 1;

          return (
            <div
              key={entity.id}
              ref={(element: HTMLHeadingElement | null) =>
                setLastElemet(element, isLast)
              }
            >
              <GridTile entity={entity} clickEvent={props.clickEvent} {...props} />
            </div>
          );
        }
      );
    };

    return (
      <div id={"grid-list"} className={styles.container}>
        {gridTilesTemplate()}
      </div>
    );
  };
}
