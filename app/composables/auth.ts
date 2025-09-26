import type { TAuthState } from '../../shared/types'
export const useUserAuth = () =>
  useState<TAuthState>('auth', () => ({
    accessToken: null,
    id: null,
    name: null,
    username: null,
    createdAt: null,
  }))
