import { pbkdf2Sync, randomBytes } from "crypto";

export class PasswordHashingManager {
  static toHash = (password: string): string => {
    // Creating a unique salt for a particular user
    const salt = randomBytes(16).toString("hex");

    // Hashing user's salt and password with 1000 iterations,
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      1000,
      64,
      `sha512`
    ).toString(`hex`);

    return `${hashedPassword}.${salt}`;
  };

  static compare = (
    currentUserPassword: string,
    providedPassword: string
  ): boolean => {
    const [currentHasedPassword, salt] = currentUserPassword.split(".");
    // Hashing user's salt and password with 1000 iterations,
    const hashedPassword = pbkdf2Sync(
      providedPassword,
      salt,
      1000,
      64,
      `sha512`
    ).toString(`hex`);

    return currentHasedPassword === hashedPassword;
  };
}
