import Transaction from './Transaction'
import sha256 from '../utils/sha256'
import { BlockConstructor, IBlock } from '../interface'

class Block implements IBlock {
    private _timestamp: Date
    private _transactions: Transaction[]
    private _prevBlockHash: string
    private _hash: string
    private _address: string

    constructor({ prevBlockHash, timestamp, transactions, address, hash }: BlockConstructor) {
        this._timestamp = timestamp || new Date()

        this._transactions = transactions
            ? transactions.map(({ data, timestamp }) => new Transaction(data, new Date(timestamp)))
            : []

        this._prevBlockHash = prevBlockHash
        this._hash = hash || this.getHash()
        this._address = address
    }

    get timestamp() {
        return this._timestamp
    }

    get transactions() {
        return this._transactions
    }

    get hash() {
        return this._hash
    }

    get prevBlockHash() {
        return this._prevBlockHash
    }

    get address() {
        return this._address
    }

    getTransactionHashes() {
        return this._transactions.reduce((acc: string, t) => acc + t.getHash(), '')
    }

    getHash(): string {
        return sha256(this.prevBlockHash + this.getTransactionHashes())
    }

    addTransaction(data: string) {
        this._transactions.push(new Transaction(data))
        this._hash = this.getHash()
    }
}

export default Block
