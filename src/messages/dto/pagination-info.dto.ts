export enum MessageOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationInfo {
  page?: number = 1;
  limit?: number = 50;
  order?: MessageOrder = MessageOrder.ASC;
}
