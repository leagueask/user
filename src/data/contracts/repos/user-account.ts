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
  load: (params: LoadUserAccountRepository.Params) => Promise<void>
}

namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }
}
