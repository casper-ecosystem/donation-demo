export interface ErrorResult {
  error: string;
  details: string;
}

export interface GetResponseType<Entity extends any> {
  error: ErrorResult | null;
  httpCode: number;
  data: Entity | null;
}
