export interface SignUpData {
  login: string,
  password: string
  name?: string,
}

export interface SignUpResponse {
  id: string,
  name: string,
  login: string
}

export interface SignInResponse {
  token: string
}
