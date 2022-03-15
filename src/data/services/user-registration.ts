import { UserRegistration } from '@/domain/features'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'
import { RegistrationError } from '@/domain/errors'
import { TokenGenerator } from '@/data/contracts/crypto'
import { AccessToken } from '@/domain/models'

export class UserRegistrationService implements UserRegistration {
  constructor (
    private readonly userApi: LoadUserAccountRepository & RegisterUserRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async peform (params: UserRegistration.Params): Promise<UserRegistration.Result> {
    const userLoaded = await this.userApi.load({ email: params.email })
    if (userLoaded === undefined) {
      const userAccount = await this.userApi.register(params)
      await this.crypto.generateToken({ key: userAccount.id, expirationInMs: AccessToken.expirationInMs })
    }
    return new RegistrationError()
  }
}
