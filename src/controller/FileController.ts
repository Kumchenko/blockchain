import { existsSync, readFileSync, writeFileSync } from 'fs'

class FileController {
    write(data: string, filename: string) {
        try {
            writeFileSync(filename, data, 'utf8')
            console.log(`File ${filename} wrote`)
        } catch (e) {
            console.error(`File ${filename} wasn't updated! Details: ${e}`)
        }
    }

    read(filename: string) {
        try {
            return readFileSync(filename, 'utf8')
        } catch {
            console.error(`Can't read the file ${filename}`)
        }
        return ''
    }

    isExist(filename: string) {
        return existsSync(filename)
    }
}

export default FileController
