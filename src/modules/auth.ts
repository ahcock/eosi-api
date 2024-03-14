import jwt from 'jsonwebtoken'

type User = {
  id: string;
  username: string;
}
export const createJWT = (user: User) => {
  const token = jwt.sign({
    id: user.id,
    username: user.username
  }, process.env.JWT_TOKEN ?? '')
  return token
}