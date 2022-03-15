import { UserAccount } from '@/domain/models'

export interface RegisterUserRepository {
  register: (params: RegisterUserRepository.Params) => Promise<RegisterUserRepository.Result>
}

namespace RegisterUserRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = UserAccount
}

export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    name: string
    email: string
  }
}
