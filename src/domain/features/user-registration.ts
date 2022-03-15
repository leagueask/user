export interface UserRegistration {
  peform: (params: UserRegistration.Params) => Promise<void>
}

export namespace UserRegistration {
  export type Params = {
    name: string
    email: string
    password: string
  }
}
