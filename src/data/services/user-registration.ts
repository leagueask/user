import { UserRegistration } from '@/domain/features'
import { UserApi } from '@/data/contracts/apis'

export class UserRegistrationService implements UserRegistration {
  constructor (
    private readonly userApi: UserApi
  ) {}

  async peform (params: UserRegistration.Params): Promise<void> {
    await this.userApi.register(params)
  }
}
