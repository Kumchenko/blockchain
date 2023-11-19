import { publicEncrypt, privateDecrypt, generateKeyPairSync } from 'crypto'

class RSA {
    // Function to encrypt a string using the public key
    encryptWithPublicKey(publicKey: string, data: string): string {
        try {
            const bufferData = Buffer.from(data, 'utf-8')
            const encryptedData = publicEncrypt(publicKey, bufferData)
            return encryptedData.toString('base64')
        } catch {
            console.error('Encrypting error!')
        }
        return ''
    }

    // Function to decrypt a string using the private key
    decryptWithPrivateKey(privateKey: string, encryptedData: string): string {
        try {
            const bufferData = Buffer.from(encryptedData, 'base64')
            const decryptedData = privateDecrypt(privateKey, bufferData)
            return decryptedData.toString('utf-8')
        } catch {
            console.error('Decrypting error!')
        }
        return ''
    }

    // Function to generate RSA key pair
    generateKeys() {
        return generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        })
    }

    // Function to check match public and private key
    verifyKey(publicKey: string, privateKey: string) {
        const phrase = 'abcdef'

        const encryptedString = this.encryptWithPublicKey(publicKey, phrase)
        const decryptedString = this.decryptWithPrivateKey(privateKey, encryptedString)

        return phrase === decryptedString
    }
}

export default new RSA()
