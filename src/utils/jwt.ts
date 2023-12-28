import jwt from "jsonwebtoken";

class JwtHelper {
  sign(payload: string | object): string {
    return jwt.sign(payload, process.env.SECRET_KEY as string);
  }

  verify(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY as string);
  }
}

export default new JwtHelper();
