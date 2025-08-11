import {
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
export class GetSessionsRequest {
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Page must be at least 1' })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  limit?: number = 10;
}
