import crypto from 'crypto';

export function hashUserPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const iterations = 100000; // Number of iterations for hashing
    const keylen = 64; // Length of the resulting key
    const digest = 'sha512'; // Hash algorithm

    const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
    return hashedPassword.toString('hex') + ':' + salt;
}

export function verifyPassword(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split(':');
    const iterations = 100000;
    const keylen = 64;
    const digest = 'sha512';

    const suppliedPasswordBuf = crypto.pbkdf2Sync(suppliedPassword, salt, iterations, keylen, digest);
    return hashedPassword === suppliedPasswordBuf.toString('hex');
}
