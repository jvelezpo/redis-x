export interface IRedisConnectRequest {
  readonly id: string;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly password?: string;
}
