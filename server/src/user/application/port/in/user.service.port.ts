export abstract class UserServicePort {
  abstract getUserNickNameByEmail(email: string): Promise<string | null>
}