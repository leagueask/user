import { UserRegistration } from '@/domain/features'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'

export class UserRegistrationService implements UserRegistration {
  constructor (
    private readonly userApi: LoadUserAccountRepository & RegisterUserRepository
  ) {}

  async peform (params: UserRegistration.Params): Promise<void> {
    const userAccount = await this.userApi.load({ email: params.email })
    if (userAccount === undefined) {
      await this.userApi.register(params)
    }
  }
}
