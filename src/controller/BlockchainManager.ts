import { IBlockchain } from '../interface'
import Block from './Block'
import Blockchain from './Blockchain'
import FileController from './FileController'

class BlockchainManager {
    private filename: string
    private fileController: FileController
    private blockchain: Blockchain

    constructor(filename: string) {
        this.filename = filename
        this.fileController = new FileController()

        let chain: Block[] = []
        // Try to persist Blockchain data from storage
        if (this.fileController.isExist(filename)) {
            const persistedBC = this.readFromStorage()
            chain = persistedBC
                ? persistedBC.chain.map(b => {
                      return new Block({ ...b, timestamp: new Date(b.timestamp) })
                  })
                : []
        }

        this.blockchain = new Blockchain(chain)
    }

    addBlock(filename: string) {
        const { address, key } = this.blockchain.addBlock()

        this.fileController.write(address, `${filename}.json`)
        this.fileController.write(key, `private-${filename}.json`)

        this.saveAll()
    }

    addTransactionToBlock(filename: string, data: string) {
        const address = this.fileController.read(`${filename}.json`)
        const key = this.fileController.read(`private-${filename}.json`)

        const isSucceed = this.blockchain.addTransactionToBlock(address, key, data)

        isSucceed && this.saveAll()
    }

    viewTransactionsByBlock(filename: string) {
        const address = this.fileController.read(`${filename}.json`)
        const key = this.fileController.read(`private-${filename}.json`)

        this.blockchain.viewTransactionsByBlock(address, key)
    }

    saveAll() {
        const persistData = this.blockchain.getAll()
        this.writeToStorage(JSON.stringify(persistData))
    }

    writeToStorage(data: string) {
        this.fileController.write(data, this.filename)
    }

    readFromStorage() {
        try {
            const readData = this.fileController.read(this.filename)
            return <IBlockchain>JSON.parse(readData)
        } catch (e) {
            console.error(`Error occured when tried to access the storage: ${this.filename}`)
            console.error(`Details: ${e}`)
        }
    }
}

export default BlockchainManager
