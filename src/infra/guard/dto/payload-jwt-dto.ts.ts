export interface IPayloadJwtDTO {
  id: string;
  email: string;
  username: string;
  name: string;
}

export interface IJWTResolver extends IPayloadJwtDTO {
  token: string;
}
