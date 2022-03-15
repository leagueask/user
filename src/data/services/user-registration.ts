import { UserRegistration } from '@/domain/features'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'
import { RegistrationError } from '@/domain/errors'

export class UserRegistrationService implements UserRegistration {
  constructor (
    private readonly userApi: LoadUserAccountRepository & RegisterUserRepository
  ) {}

  async peform (params: UserRegistration.Params): Promise<UserRegistration.Result> {
    const userLoaded = await this.userApi.load({ email: params.email })
    if (userLoaded === undefined) {
      const userAccount = await this.userApi.register(params)
      return userAccount
    }
    return new RegistrationError()
  }
}
