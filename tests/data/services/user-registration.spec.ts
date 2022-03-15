import { UserRegistrationService } from '@/data/services'
import { UserRegistration } from '@/domain/features'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'
import { RegistrationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UserRegistrationService', () => {
  let sut: UserRegistrationService
  let userRepo: MockProxy<LoadUserAccountRepository & RegisterUserRepository>
  let userData: UserRegistration.Params

  beforeAll(() => {
    userData = {
      name: 'any_name', email: 'any_email', password: 'any_password'
    }
    userRepo = mock()
    userRepo.load.mockResolvedValueOnce(undefined)
  })

  beforeEach(() => {
    sut = new UserRegistrationService(userRepo)
  })

  it('LoadUserAccountRepository should be called with correct params', async () => {
    await sut.peform(userData)

    expect(userRepo.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userRepo.load).toBeCalledTimes(1)
  })

  it('should call RegisterUserRepository when LoadUserAccountRepository did not found the same email passed', async () => {
    await sut.peform(userData)

    expect(userRepo.register).toHaveBeenCalled()
    expect(userRepo.register).toBeCalledTimes(1)
  })

  it('should return RegistrationError when LoadUserAccountRepository found the same email passed', async () => {
    userRepo.load.mockResolvedValueOnce({ name: 'any_name', email: 'any_email' })

    const registrationResult = await sut.peform(userData)

    expect(registrationResult).toEqual(new RegistrationError())
  })

  it('should return UserAccount when RegisterUserRepository succefully register a user', async () => {
    userRepo.register.mockResolvedValueOnce({ id: 'any_id', name: 'any_name', email: 'any_email' })

    const registrationResult = await sut.peform(userData)

    expect(registrationResult).toEqual({ id: 'any_id', name: 'any_name', email: 'any_email' })
  })
})
