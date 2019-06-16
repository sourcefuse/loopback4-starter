export const enum AuthenticateErrorKeys {
  UserDoesNotExist = 'UserDoesNotExist',
  UserInactive = 'User is inactive',
  TokenRevoked = 'Token is revoked',
  TempPasswordLoginDisallowed = 'Login not allowed using temporary password. Please reset password.',
}
