import jwt from 'jsonwebtoken'
import { createError } from '#imports'

const config = useRuntimeConfig()

export function signJwt(payload: string | Buffer | object, expiresIn: string = '1h'): string {
  if (!config.jwtSecretKey) {
    throw createError({
      status: 401,
      statusMessage: 'Secret key is not defined',
    })
  }
  return jwt.sign(payload, config.jwtSecretKey, { algorithm: 'HS256', expiresIn: expiresIn } as any)
}

export function verifyJwt<T>(token: string): T | null {
  try {
    if (!config.jwtSecretKey) {
      throw createError({
        status: 401,
        statusMessage: 'Secret key is not defined',
      })
    }
    return jwt.verify(token, config.jwtSecretKey) as T
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    })
  }
}
