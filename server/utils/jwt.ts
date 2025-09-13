import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET_KEY

export function signJwt(payload: string | Buffer | object, expiresIn: string = '1h'): string {
  if (!SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined')
  }
  return jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256', expiresIn: expiresIn } as any)
}
// verifikasi token
export function verifyJwt<T>(token: string): T | null {
  try {
    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined')
    }
    return jwt.verify(token, SECRET_KEY) as T
  } catch {
    return null
  }
}
