import { createHash } from 'crypto';

/**
 * Hash two 32 byte arrays
 */
export function hash(a, b) {
    let hashed = createHash('sha256');
    hashed.update(Buffer.concat([a, b]))
  return hashed.digest();
}