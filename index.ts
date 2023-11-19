import BlockchainManager from './src/controller/BlockchainManager'
import Menu from './src/controller/Menu'

const blockchainManager = new BlockchainManager('bc.json')
const menu = new Menu(blockchainManager)
