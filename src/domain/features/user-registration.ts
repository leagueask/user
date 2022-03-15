import { RegistrationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export interface UserRegistration {
  perform: (params: UserRegistration.Params) => Promise<UserRegistration.Result>
}

export namespace UserRegistration {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = RegistrationError | AccessToken
}
