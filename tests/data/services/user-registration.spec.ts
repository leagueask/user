import { UserRegistrationService } from '@/data/services'
import { UserApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UserRegistrationService', () => {
  it('UserApi should be called with correct params', async () => {
    const userApi: MockProxy<UserApi> = mock<UserApi>()
    const sut = new UserRegistrationService(userApi)

    await sut.peform({ name: 'any_name', email: 'any_email', password: 'any_password' })

    expect(userApi.register).toHaveBeenCalledWith({ name: 'any_name', email: 'any_email', password: 'any_password' })
    expect(userApi.register).toBeCalledTimes(1)
  })
})
