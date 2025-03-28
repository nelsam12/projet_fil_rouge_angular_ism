export interface RestResponseModel<T> {
  status: number,
  data: T,
  currentPage?: number,
  totalPages?: number,
  isFirst?: boolean,
  isLast?: boolean,
  type: string,
  pages? : number[]
}
