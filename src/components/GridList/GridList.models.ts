export interface IGridDataSource<T> {
  entities: T[],
  currPage: number;
  pageCount: number;
}

export interface IGridComponentProps<T> {
  dataSource: IGridDataSource<T>;
  nextPage: () => void;
  infiniteScroll: boolean;
  [key: string]: any;
}

export interface IGridComponent<T> {
  entity: T;
  clickEvent: (entity: T) => {};
  [key: string]: any;
}
