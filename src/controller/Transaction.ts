import { ITransaction } from '../interface'
import sha256 from '../utils/sha256'

class Transaction implements ITransaction {
    private _data: string
    private _timestamp: Date
    private _hash: string

    constructor(data: string, timestamp?: Date) {
        this._timestamp = timestamp || new Date()
        this._data = data
        this._hash = this.getHash()
    }

    get hash() {
        return this._hash
    }

    get timestamp() {
        return this._timestamp
    }

    get data() {
        return this._data
    }

    getHash() {
        return sha256(this._data)
    }
}

export default Transaction
