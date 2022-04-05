import * as crypto from 'crypto';

export const generateUniqueId = (size: number) => {
  return crypto.randomBytes(size).toString('hex');
};
