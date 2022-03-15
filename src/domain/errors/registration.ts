export class RegistrationError extends Error {
  constructor () {
    super('User already exists')
    this.name = 'RegistrationError'
  }
}
