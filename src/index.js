const {
  createHash,
  createCipheriv,
  createDecipheriv
} = require('crypto');

let initOptions = {};

class Configure {
  constructor(options) {
    initOptions = options || {};
  }

  validateKey() {
    return initOptions && initOptions.workingKey ? true : false;
  }

  throwError(requirement) {
    console.error(`${requirement} is required to perform this action`);
  }

  encrypt(plainText) {
    if (this.validateKey && plainText) {
      const { workingKey } = initOptions;
      const m = createHash('md5');
      m.update(workingKey);
      const key = m.digest();
      const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
      const cipher = createCipheriv('aes-128-cbc', key, iv);
      let encoded = cipher.update(plainText, 'utf8', 'hex');
      encoded += cipher.final('hex');
      return encoded;
    } else if (!plainText) {
      throwError('Plain text');
      return false;
    } else {
      throwError('Working Key');
      return false;
    }
  }

  decrypt(encText) {
    if (this.validateKey && encText) {
      const { workingKey } = initOptions;
      const m = createHash('md5');
      m.update(workingKey);
      const key = m.digest();
      const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
      const decipher = createDecipheriv('aes-128-cbc', key, iv);
      let decoded = decipher.update(encText, 'hex', 'utf8');
      decoded += decipher.final('utf8');
      return decoded;
    } else if (!encText) {
      throwError('Encrypted text');
      return false;
    } else {
      throwError('Working Key');
      return false;
    }
  }

}

export { Configure };
