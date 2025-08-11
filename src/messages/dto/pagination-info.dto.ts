import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsEnum,
  isNumber,
  IsNumber,
} from 'class-validator';

export enum MessageOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationInfo {
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(200, { message: 'Limit cannot exceed 200' })
  limit?: number = 50;

  @IsOptional()
  @IsEnum(MessageOrder, { message: 'Order must be either "asc" or "desc"' })
  order?: MessageOrder = MessageOrder.ASC;
}
