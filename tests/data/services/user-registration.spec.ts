import { UserRegistrationService } from '@/data/services'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UserRegistrationService', () => {
  let sut: UserRegistrationService
  let userRepo: MockProxy<LoadUserAccountRepository & RegisterUserRepository>
  beforeAll(() => {
    userRepo = mock()
  })
  beforeEach(() => {
    sut = new UserRegistrationService(userRepo)
  })
  it('LoadUserAccountRepository should be called with correct params', async () => {
    await sut.peform({ name: 'any_name', email: 'any_email', password: 'any_password' })

    expect(userRepo.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userRepo.load).toBeCalledTimes(1)
  })

  it('should call RegisterUserRepository when LoadUserAccountRepository did not found the same email passed', async () => {
    userRepo.load.mockResolvedValueOnce(undefined)
    await sut.peform({ name: 'any_name', email: 'any_email', password: 'any_password' })

    expect(userRepo.register).toHaveBeenCalled()
    expect(userRepo.register).toBeCalledTimes(1)
  })
})
