import { User } from "../shared/schemas/user.schema";
import jwt from 'jsonwebtoken'
import * as _ from 'lodash';

export const jwtGenerator = (user:User) => {
  const generatedToken = jwt.sign(_.omit(user,'passwordhash','firedate'),process.env.JWT_SECRET_PASSWORD!,{
    expiresIn:'30m',
  })
  return generatedToken
}