export interface PostgresError {
  code: string;
  detail: string;
  message: string;
  stack?: string;
}
