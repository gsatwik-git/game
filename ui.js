let blessed = require('blessed');
const { black } = require('colors');

class ui {
    constructor() {
        this.blessed = blessed
        this.screen = blessed.screen()
        this.screen.title = 'game.js'
        this.gameBox = this.createGameBox()
        this.gameCont = this.blessed.box(this.gameBox)
        this.dashBoard = this.createDashboard()
        this.dashContainer = this.blessed.box(this.dashBoard)
        this.game = this.createGame() 
        this.gameArea = this.blessed.box(this.game)
        this.field = this.createField()
        this.fieldCont = this.blessed.box(this.field)
        this.log = this.createLog()
        this.logCont = this.blessed.box(this.log)
        
    }
    createGameBox() {
        return {
            top: 'left',
            left: 'left',
            width: '100%',
            height: '100%',
            tags: false,
            border: {
            type: 'line'
            },
            style: {
            fg: 'white',
            bg: 'black',
            border: {
                fg: '#f0f0f0'
            }
            }
        }
    }
    createDashboard() { 
        return {
            parent: this.gameCont,  
            top: '5%',
            left: '0%',
            width: "15%",
            height: "90%",
            border: {
                type: 'line'
            },
            style: {
                bg: 'black',
                fg: 'white'
            },
            content: `\n\n\nInstructions \nDirections: \nLeft: a \nRight: d \nUp: w\nDown: s`.blue
        }
    }
    createGame() {
        return {
            parent: this.gameCont,
            top: '5%',
            left: '15%',
            width: '70%',
            height: '90%',
            border: {
                type: 'line'
            },
            content: 'Game Screen',
            style: {
                bg: 'black',
                fg: 'white'
            }
        }
    }
    createField() {
        return {
            parent: this.gameArea,
            top: '30%',
            left:'5%',
            width: '40%',
            height: '40%',
            border: {
                type: 'line'
            },
            style: {
                bg: 'black',
                fg: 'white'
            }
        }
    }
    createLog() {
        return {
            parent: this.gameArea,
            top:'30%',
            left:'50%',
            width: '40%',
            height: '40%',
            content: 'Game Log',
            border: {
                type: 'line'
            },
            style: {
                bg: 'black',
                fg: 'white'
            }
        }
    }
    drawChar(char,coord) {
        this.blessed.box({
            parent: this.fieldCont,
            top: coord[1],
            left: coord[0],
            width: 1,
            height: 1,
            content: char,
            style: {
                fg: 'white',
                bg: 'black'
            }
        })
    }
    /* 
    updateLevel(level) {
        this.dashContainer.setLine(0,`Level: ${level}`)
    }
    updateLivesLeft (lives) {
        this.dashContainer.setLine(1,`Lives Left${lives}`)
    }
    addLog(note) {
        this.logCont.setLine(1,`${note}`)
    }*/
    render() {

        this.screen.append(this.gameCont)
        this.screen.render()
    }    

} 



const hole = 'O '.white;       // areas to avoid by the player. They will lose a life every time they land in one of these
const fieldCharacter = '░ '.green;    // areas to walk through safely by the player 
const pathCharacter = '* '.blue;      // the player's position is indicated by this icon

let level1 = [[fieldCharacter,fieldCharacter,hole,fieldCharacter],[fieldCharacter,fieldCharacter,hole,fieldCharacter],[hole,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,fieldCharacter,fieldCharacter]]


let newUi = new ui()
for (let i = 0; i<level1.length;i++) {
    for (let j = 0; j < level1[0].length;j++) {
        newUi.drawChar(level1[i][j],[i,j])
    }
}

newUi.drawChar(pathCharacter,[0,0])
//newUi.addLog('XYZ')
newUi.render()
console.log(typeof newUi.dashContainer)