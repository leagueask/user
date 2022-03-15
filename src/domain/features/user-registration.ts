import { RegistrationError } from '@/domain/errors'
import { UserAccount } from '../models'

export interface UserRegistration {
  peform: (params: UserRegistration.Params) => Promise<UserRegistration.Result>
}

export namespace UserRegistration {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = RegistrationError | UserAccount
}
