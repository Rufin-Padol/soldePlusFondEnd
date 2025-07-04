export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface AuthentificationResponseDTO {
  token: string;
  refreshToken: string;
  id: number;
  nom: string;
  email: string;
  role: string;

  code:number;
  messsage:string;
}
