export interface RegisterUserRepository {
  register: (params: RegisterUserRepository.Params) => Promise<void>
}

namespace RegisterUserRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }
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
