import { UserRegistration } from '@/domain/features'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'
import { RegistrationError } from '@/domain/errors'

export class UserRegistrationService implements UserRegistration {
  constructor (
    private readonly userApi: LoadUserAccountRepository & RegisterUserRepository
  ) {}

  async peform (params: UserRegistration.Params): Promise<UserRegistration.Result> {
    const userAccount = await this.userApi.load({ email: params.email })
    if (userAccount === undefined) {
      await this.userApi.register(params)
    }
    return new RegistrationError()
  }
}
