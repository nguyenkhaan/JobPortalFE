export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PageResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  size: number;
}
