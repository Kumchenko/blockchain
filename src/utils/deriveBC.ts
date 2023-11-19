import Block from '../controller/Block'
import { IBlockchain } from '../interface'

export default (chain: Block[]): IBlockchain => ({
    chain: chain.map(({ timestamp, transactions, prevBlockHash, hash, address }) => ({
        timestamp,
        address,
        hash,
        prevBlockHash,
        transactions: transactions.map(({ timestamp, data, hash }) => ({
            timestamp,
            hash,
            data,
        })),
    })),
})
