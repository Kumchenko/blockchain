export type ITransaction = Readonly<{
    timestamp: Date
    data: string
    hash: string
}>

export type IBlock = Readonly<{
    timestamp: Date
    address: string
    transactions: ITransaction[]
    prevBlockHash: string
    hash: string
}>

export type IBlockchain = {
    chain: IBlock[]
}

export type BlockConstructor = {
    prevBlockHash: string
    address: string
    hash?: string
    timestamp?: Date
    transactions?: ITransaction[]
}
