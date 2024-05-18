import bigInt from "big-integer";

class RSA {
  constructor() {
    this.publicKey = null;
    this.privateKey = null;
  }

  generateKeys(bitLength = 10) {
    let e, p, q, n, phi, d;

    do {
      p = this.generatePrime(bitLength);
      q = this.generatePrime(bitLength);
      e = this.generateRandomExponent(bitLength);
      n = p.multiply(q);
      phi = p.subtract(1).multiply(q.subtract(1));

      try {
        d = e.modInv(phi);
      } catch (error) {
        console.error("Error: ", error);
        d = bigInt(0);
      }
    } while (p.equals(q) || e.greater(phi) || d.equals(0) || !e.isPrime());

    this.publicKey = { e, n };
    this.privateKey = { d, n };
  }

  generatePrime(bitLength) {
    let prime;
    do {
      prime = bigInt.randBetween(
        bigInt(2).pow(Math.floor(bitLength / 4)),
        bigInt(2).pow(bitLength).subtract(1)
      );
    } while (!prime.isProbablePrime(32));
    return prime;
  }

  generateRandomExponent(bitLength) {
    let exponent;
    do {
      exponent = bigInt.randBetween(
        bigInt(2).pow(Math.floor(bitLength / 4)),
        bigInt(2).pow(bitLength).subtract(1)
      );
    } while (!exponent.isProbablePrime(32));
    return exponent;
  }

  encrypt(message, e, n) {
    e = bigInt(e);
    n = bigInt(n);
    return message
      .split("")
      .map((char) => {
        const asciiValue = char.charCodeAt(0);
        console.log("asciiValue", asciiValue);
        const asciiBigInt = bigInt(asciiValue);
        return asciiBigInt.modPow(e, n).toString();
      })
      .join(" ");
  }

  decrypt(encryptedMessage, d, n) {
    d = bigInt(d);
    n = bigInt(n);
    return encryptedMessage
      .split(" ")
      .map((encryptedChar) => {
        const encryptedBigInt = bigInt(encryptedChar);
        const decryptedAscii = encryptedBigInt.modPow(d, n).toJSNumber();
        return String.fromCharCode(decryptedAscii);
      })
      .join("");
  }
}

export default RSA;
