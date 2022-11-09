export interface SignUpData {
  login: string,
  password: string
  name?: string,
}

export interface SignInResponse {
  token: string
}

export interface User {
  id: string,
  name: string,
  login: string
}

export interface LoggedUser {
  userId: string,
  login: string,
  iat: number
}
