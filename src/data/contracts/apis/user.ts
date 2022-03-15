export interface UserApi {
  register: (params: UserApi.Params) => Promise<void>
}

namespace UserApi {
  export type Params = {
    name: string
    email: string
    password: string
  }
}
