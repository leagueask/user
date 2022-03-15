export class AccessToken {
  constructor (
    private readonly value: string
  ) {}

  static get expirationInMs (): number {
    return 24 * 60 * 60 * 1000
  }
}
