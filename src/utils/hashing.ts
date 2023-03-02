import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function hash(input: string) {
  const salt = randomBytes(16).toString('hex');
  const hashedInput = scryptSync(input, salt, 64).toString('hex');

  return `${salt}:${hashedInput}`;
}

function compare(password: string, hash: string) {
  const [salt, key] = hash.split(':');
  const hashedBuffer = scryptSync(password, salt, 64);

  const keyBuffer = Buffer.from(key, 'hex');
  return timingSafeEqual(hashedBuffer, keyBuffer);
}

export { hash, compare };