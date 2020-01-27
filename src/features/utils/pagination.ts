import _ from "lodash";

export type Paginate<DataToPaginate> = (
  dataToPaginate: DataToPaginate,
  pageSize: number,
  page: number
) => DataToPaginate;

export function paginate<T>(
  dataToPaginate: T[],
  pageSize: number,
  page: number
): T[] | undefined {
  const newChunk = _.chunk(dataToPaginate, pageSize);

  return newChunk.find((element, index) => index === page - 1);
}
