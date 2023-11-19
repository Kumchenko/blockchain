import deriveBC from '../utils/deriveBC'
import Block from './Block'
import RSA from './RSA'

class Blockchain {
    private _chain: Block[] = []

    constructor(chain?: Block[]) {
        this._chain = chain || []
        this.isValid()
    }

    get chain() {
        return this._chain
    }

    getLastBlock() {
        return this.chain.at(-1)
    }

    addBlock() {
        const { publicKey, privateKey } = RSA.generateKeys()
        this._chain.push(
            new Block({
                prevBlockHash: this.getLastBlock()?.hash || '',
                address: publicKey,
            }),
        )

        return {
            address: publicKey,
            key: privateKey,
        }
    }

    addTransactionToBlock(address: string, privateKey: string, data: string) {
        const blockIndex = this._chain.findIndex(b => b.address === address)

        if (blockIndex === this._chain.length - 1) {
            const block = this._chain[blockIndex]
            if (block) {
                if (RSA.verifyKey(address, privateKey)) {
                    block.addTransaction(RSA.encryptWithPublicKey(address, data))
                    return true
                } else {
                    console.error('PrivateKey is wrong!')
                }
            } else {
                console.error('Block unavailable!')
            }
        } else {
            if (blockIndex === -1) {
                console.error('Block with this address not found!')
            } else {
                console.error('Block cannot be updated, create the new one!')
            }
        }

        return false
    }

    isValid() {
        const wrongBlocks = this._chain
            .filter((block, index, chain) => {
                return (
                    block.hash !== block.getHash() || (index > 0 && chain[index - 1].getHash() !== block.prevBlockHash)
                )
            })
            .map(b => b.hash)

        if (wrongBlocks.length > 0) {
            console.error('Blockchain is compromised! Compromised block-hashes: ', wrongBlocks)
            process.exit()
        } else console.log('Blockchain is verified')
    }

    viewTransactionsByBlock(address: string, privateKey: string) {
        const blockIndex = this._chain.findIndex(b => b.address === address)

        const block = this._chain[blockIndex]
        if (block) {
            if (RSA.verifyKey(address, privateKey)) {
                console.log(block.transactions.map(t => RSA.decryptWithPrivateKey(privateKey, t.data)))
            }
        } else {
            console.error('Wrong keys!')
        }
    }

    getAll() {
        return deriveBC(this.chain)
    }
}

export default Blockchain
