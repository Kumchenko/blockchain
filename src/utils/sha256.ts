import { BinaryLike, createHash } from 'node:crypto'

export default (message: BinaryLike) => createHash('sha256').update(message).digest('hex')
