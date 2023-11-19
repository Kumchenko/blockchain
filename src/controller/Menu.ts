import readline from 'readline-sync'
import BlockchainManager from './BlockchainManager'

enum MenuState {
    Initial,
    New,
    View,
    Add,
    Exit,
}

type MenuOption = [string, MenuState]

const InitialOptions: [string, MenuState][] = [
    ['Створити новий блок', MenuState.New],
    ['Додати транзакцію у існуючий', MenuState.Add],
    ['Переглянути транзакції блоку', MenuState.View],
    ['Вихід', MenuState.Exit],
]

class Menu {
    state: MenuState
    bcManager: BlockchainManager

    constructor(blockchainManager: BlockchainManager) {
        this.state = MenuState.Initial
        this.bcManager = blockchainManager
        this.show()
    }

    show() {
        switch (this.state) {
            case MenuState.Initial: {
                this.viewMenu(InitialOptions)
                break
            }
            case MenuState.New: {
                const filename = this.prompt(
                    'Введіть назву для файлу для зберігання ключів без крапок та без розширення: ',
                )
                this.bcManager.addBlock(filename)
                break
            }

            case MenuState.Add: {
                const filename = this.prompt('Введіть назву використану для зберігання ключів доступу: ')
                const data = this.prompt('Введіть бажаний зміст для транзакції: ')
                this.bcManager.addTransactionToBlock(filename, data)
                break
            }
            case MenuState.View: {
                const filename = this.prompt('Введіть назву використану для зберігання ключів доступу: ')
                this.bcManager.viewTransactionsByBlock(filename)
                break
            }
            case MenuState.Exit: {
                process.exit()
            }
            default: {
                const _exhaustiveCheck: never = this.state
                console.error('Menu error!')
            }
        }
        this.state = MenuState.Initial
        this.show()
    }

    viewMenu(menuOptions: MenuOption[]) {
        const options = menuOptions.map(([option, state], index): [string, MenuState] => [
            `${index + 1}. ` + option,
            state,
        ])

        console.log('\n', '\nМЕНЮ')
        options.forEach(([option]) => console.log(option))
        const answer = readline.question('Оберіть опцію: ')
        const option = parseInt(answer)

        if (option <= options.length && option > 0) {
            this.state = options[option - 1][1]
        }

        this.show()
    }

    prompt(question: string) {
        return readline.question(question)
    }
}

export default Menu
