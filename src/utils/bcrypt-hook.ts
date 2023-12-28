import bcrypt from "bcryptjs";
import { saltOrRounds } from "./constants.js";

class BcryptHelper {
  hashSync(password: any, saltOrRounds: string | number): string {
    return bcrypt.hashSync(password, saltOrRounds);
  }

  compareSync(originalPass: string | Buffer, hashedPass: string) {
    return bcrypt.compareSync(originalPass as string, hashedPass);
  }
}

export default new BcryptHelper();
