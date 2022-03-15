import { UserRegistrationService } from '@/data/services'
import { UserRegistration } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RegistrationError } from '@/domain/errors'
import { LoadUserAccountRepository, RegisterUserRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UserRegistrationService', () => {
  let sut: UserRegistrationService
  let userRepo: MockProxy<LoadUserAccountRepository & RegisterUserRepository>
  let userData: UserRegistration.Params
  let crypto: MockProxy<TokenGenerator>

  beforeAll(() => {
    userData = {
      name: 'any_name', email: 'any_email', password: 'any_password'
    }
    userRepo = mock()
    userRepo.load.mockResolvedValue(undefined)
    userRepo.register.mockResolvedValue({ id: 'any_id', name: 'any_name', email: 'any_email' })
    crypto = mock()
  })

  beforeEach(() => {
    sut = new UserRegistrationService(userRepo, crypto)
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

  it('should call TokenGenerator with correct params', async () => {
    await sut.peform(userData)

    expect(crypto.generateToken).toBeCalledWith({ key: 'any_id', expirationInMs: AccessToken.expirationInMs })
    expect(crypto.generateToken).toBeCalledTimes(1)
  })
})
