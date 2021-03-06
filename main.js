const prompt = require('prompt-sync')({sigint: true});
const colors = require('colors')
var keypress = require('keypress');
keypress(process.stdin);

const hat = '^'.magenta;        // The item to find at the end of each level
const hole = 'O'.black;       // areas to avoid by the player. They will lose a life every time they land in one of these
const fieldCharacter = '░'.green;    // areas to walk through safely by the player 
const pathCharacter = '*'.blue;      // the player's position is indicated by this icon
const gap = 'X'.yellow // these are hurdles the player must pass by collecting a rope (~)
const rope = '~'.cyan     // this is a rope that 
const evil = 'ꐦ'.red       // Moving villain in the field as an obstacle for the player
const banana ='b'       // slippery area that will push the player by 3 steps in the direction they are moving
const quicksand = 'q'       //area in the field that will keep the player in the same place for 3 steps
const teleport = 't'        // will teleport the player to a random teleport pad on the field
const flipper = 'f'     //Going through this will switch the directions of the game (e.g: press "up" to go down)
const collectible = 'c'     // random collectibles in the game. Players will be rewarded for collecting all collectibles in each level.
//const chars = [hole,fieldCharacter]     
//const randChar = () => chars[Math.floor(Math.random()*2)]


let level1 = [[fieldCharacter,fieldCharacter,hole,fieldCharacter],[fieldCharacter,fieldCharacter,hole,fieldCharacter],[hole,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,fieldCharacter,fieldCharacter]]
let level2 = [[fieldCharacter,fieldCharacter,fieldCharacter,hole,hole],[hole,hole,fieldCharacter,fieldCharacter,hole],[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,hole,hole,hole],[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter]]
let level3 = [[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],[hole,hole,fieldCharacter,hole,hole,hole,fieldCharacter],[rope,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter],[fieldCharacter,hole,fieldCharacter,hole,hole,fieldCharacter,hole],[fieldCharacter,hole,hole,fieldCharacter,fieldCharacter,fieldCharacter,hole],[fieldCharacter,fieldCharacter,hole,fieldCharacter,hole,hole,hole],[hole,fieldCharacter,fieldCharacter,gap,fieldCharacter,fieldCharacter,fieldCharacter]]
let level4 = [[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],[fieldCharacter,fieldCharacter,hole,hole,hole,hole,fieldCharacter],[hole,fieldCharacter,hole,hole,rope,hole,fieldCharacter],[fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter],[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,hole],[hole,fieldCharacter,hole,hole,hole,hole,hole],[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,gap,fieldCharacter]]
let level5 = [[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],[hole,hole,hole,hole,hole,gap,hole,hole,hole,rope],[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,hole,fieldCharacter,fieldCharacter,hole,hole,hole,fieldCharacter,hole],[rope,fieldCharacter,hole,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],[hole,fieldCharacter,hole,rope,hole,hole,hole,hole,hole,hole],[fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,hole,hole,hole,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter],[gap,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,fieldCharacter,gap],[fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,hole,hole,hole,gap,fieldCharacter]]
class Field {
    constructor() {
        this.field = []
        this.hatX = 0
        this.hatY = 0
        this.userX = 0
        this.userY = 0
        this.lives = 0
        this.level = 0
        this.power = 0
        this.flip = false
    }
    userDefault () {
        this.userX = 0
        this.userY = 0
        this.field[0][0] = pathCharacter
    }
    newField (level) { 
        switch (level) { 
        case 0: 
            this.field = level1
            this.hatX = 3
            this.hatY = 3
            this.userDefault()
            this.field[3][3] = hat
            break
        case 1:         
            this.field = level2
            this.hatX = 4
            this.hatY = 4
            this.userDefault()
            this.field[4][4]= hat
            break
        case 2: 
            this.field = level3
            this.hatX = 6
            this.hatY = 6
            this.userDefault()
            this.field[6][6]= hat
            break
        case 3: 
            this.field = level4
            this.hatX = 6
            this.hatY = 6
            this.userDefault()
            this.field[6][6]= hat
            break
        case 4: 
            this.field = level5
            this.hatX = 9
            this.hatY = 9
            this.userDefault()
            this.field[9][9]= hat
            break    
        }
    }
    cheat () {
        this.userX = this.hatX
        this.userY = this.hatY
        this.field[this.hatX][this.hatY] = pathCharacter 
    }
    print () {
        this.field.forEach(x => console.log(x.join(' ')))
    }
    hatPosition() {
        return [this.hatX,this.hatY]
    }
    userPosition() {
        return [this.userX,this.userY]
    }
    outOfBounds() {
        return '\nYou moved out of bounds. Try Again!'
    }
    lostGame() {
        return '\nYou Lose!'.red
    }
    wonGame (){
        return 'You won!! \n... Wait! This is not your hat!!\n Your hat is in another field! \n The saga continues... '
    }
    decreaseLife () {
        this.lives -=1
        if (this.lives != 1){
            console.log (`You fell into a hole! You have ${this.lives} lives left!`.red)
        } else {
            console.log(`You fell into a hole! You have ${this.lives} life left!`.red)
        }
    }
    successfulMove () {
        return'Great! You are still on the field'
    }
    poweredUp() {
        this.power += 1
        console.log ('Awesome! You now have the rope to cross the gap!')
    }
    noPowerUp () {
        this.lives -=1
        console.log (`You do not have a rope (~) to cross this gap.\n You lost a life. \nYou have ${this.lives} lives left.`.red)
    }
    gapCross () {
        this.power -= 1
        console.log( 'Yay! You are now crossing the gap!') 
    }
    move (dir) {
        if (!this.flip) {
            switch(dir) {
                case 's' :
                    //this.moveDown()
                    if (this.userX+1 < this.field.length){
                        if(this.field[this.userX+1][this.userY] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX+1][this.userY] = pathCharacter
                            this.userX += 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX+1][this.userY] === hole) {
                            this.decreaseLife()
                        } else if (this.field[this.userX+1][this.userY] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX+1][this.userY] = pathCharacter
                            this.userX += 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX+1][this.userY] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX+1][this.userY] = pathCharacter
                            this.userX += 1
                            this.poweredUp()
                        } else if (this.field[this.userX+1][this.userY] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX+1][this.userY] = pathCharacter
                                this.userX += 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } else {
                        console.log (this.outOfBounds())
                        }
                    break
                case 'w' : 
                    //this.moveUp()
                    if (this.userX-1 >= 0){
                        if(this.field[this.userX-1][this.userY] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX-1][this.userY] = pathCharacter
                            this.userX -= 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } 
                        else if (this.field[this.userX-1][this.userY] === hole) {
                            this.decreaseLife()           
                        } else if (this.field[this.userX-1][this.userY] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX-1][this.userY] = pathCharacter
                            this.userX -= 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX-1][this.userY] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX-1][this.userY] = pathCharacter
                            this.userX -= 1
                            this.poweredUp()
                        } else if (this.field[this.userX-1][this.userY] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX-1][this.userY] = pathCharacter
                                this.userX -= 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } 
                    else {
                        console.log (this.outOfBounds())
                    }
                    break
                case 'a' : 
                    //this.moveLeft()
                    if (this.userY-1 >= 0){
                        if(this.field[this.userX][this.userY-1] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY-1] = pathCharacter
                            this.userY -= 1
                            console.log( this.successfulMove())
                            //return this.print()
                        } 
                        else if (this.field[this.userX][this.userY-1] === hole) {
                            this.decreaseLife()
                        } else if (this.field[this.userX][this.userY-1] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY-1] = pathCharacter
                            this.userY -= 1
                            console.log( this.successfulMove())
                            return this.print()
                        } else if (this.field[this.userX][this.userY-1] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY-1] = pathCharacter
                            this.userY -= 1
                            this.poweredUp()
                        } else if (this.field[this.userX][this.userY-1] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX][this.userY-1] = pathCharacter
                                this.userY -= 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } else {
                        console.log (this.outOfBounds())
                        }
                    break
                case 'd' :
                    //this.moveRight()
                    if (this.userY+1 < this.field[0].length){
                        if(this.field[this.userX][this.userY+1] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY+1] = pathCharacter
                            this.userY += 1
                            console.log (this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX][this.userY+1] === hole) {
                            this.decreaseLife()
                        } else if (this.field[this.userX][this.userY+1] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY+1] = pathCharacter
                            this.userY += 1
                            console.log (this.successfulMove())
                            return this.print()
                        } else if (this.field[this.userX][this.userY+1] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY+1] = pathCharacter
                            this.userY += 1
                            this.poweredUp()
                        } else if (this.field[this.userX][this.userY+1] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX][this.userY+1] = pathCharacter
                                this.userY += 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } else {
                        console.log (this.outOfBounds())
                        }
                    break
                case 'winner':
                    this.cheat()
                    break     
                default: 
                    console.log('Wrong Input! Type w to go Up, s to go Down, a to go Left, d to go Right')           
            }
        } else if (this.flip) {
            switch(dir) {
                case 'w' :
                    //this.moveDown()
                    if (this.userX+1 < this.field.length){
                        if(this.field[this.userX+1][this.userY] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX+1][this.userY] = pathCharacter
                            this.userX += 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX+1][this.userY] === hole) {
                            this.decreaseLife()
                        } else if (this.field[this.userX+1][this.userY] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX+1][this.userY] = pathCharacter
                            this.userX += 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX+1][this.userY] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX+1][this.userY] = pathCharacter
                            this.userX += 1
                            this.poweredUp()
                        } else if (this.field[this.userX+1][this.userY] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX+1][this.userY] = pathCharacter
                                this.userX += 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } else {
                        console.log (this.outOfBounds())
                        }
                    break
                case 's' : 
                    //this.moveUp()
                    if (this.userX-1 >= 0){
                        if(this.field[this.userX-1][this.userY] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX-1][this.userY] = pathCharacter
                            this.userX -= 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } 
                        else if (this.field[this.userX-1][this.userY] === hole) {
                            this.decreaseLife()           
                        } else if (this.field[this.userX-1][this.userY] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX-1][this.userY] = pathCharacter
                            this.userX -= 1
                            console.log(this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX-1][this.userY] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX-1][this.userY] = pathCharacter
                            this.userX -= 1
                            this.poweredUp()
                        } else if (this.field[this.userX-1][this.userY] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX-1][this.userY] = pathCharacter
                                this.userX -= 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } 
                    else {
                        console.log (this.outOfBounds())
                    }
                    break
                case 'd' : 
                    //this.moveLeft()
                    if (this.userY-1 >= 0){
                        if(this.field[this.userX][this.userY-1] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY-1] = pathCharacter
                            this.userY -= 1
                            console.log( this.successfulMove())
                            //return this.print()
                        } 
                        else if (this.field[this.userX][this.userY-1] === hole) {
                            this.decreaseLife()
                        } else if (this.field[this.userX][this.userY-1] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY-1] = pathCharacter
                            this.userY -= 1
                            console.log( this.successfulMove())
                            return this.print()
                        } else if (this.field[this.userX][this.userY-1] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY-1] = pathCharacter
                            this.userY -= 1
                            this.poweredUp()
                        } else if (this.field[this.userX][this.userY-1] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX][this.userY-1] = pathCharacter
                                this.userY -= 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } else {
                        console.log (this.outOfBounds())
                        }
                    break
                case 'a' :
                    //this.moveRight()
                    if (this.userY+1 < this.field[0].length){
                        if(this.field[this.userX][this.userY+1] === fieldCharacter){
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY+1] = pathCharacter
                            this.userY += 1
                            console.log (this.successfulMove())
                            //return this.print()
                        } else if (this.field[this.userX][this.userY+1] === hole) {
                            this.decreaseLife()
                        } else if (this.field[this.userX][this.userY+1] === hat) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY+1] = pathCharacter
                            this.userY += 1
                            console.log (this.successfulMove())
                            return this.print()
                        } else if (this.field[this.userX][this.userY+1] === rope) {
                            this.field[this.userX][this.userY] = fieldCharacter
                            this.field[this.userX][this.userY+1] = pathCharacter
                            this.userY += 1
                            this.poweredUp()
                        } else if (this.field[this.userX][this.userY+1] === gap) {
                            if (this.power > 0) {
                                this.field[this.userX][this.userY] = fieldCharacter
                                this.field[this.userX][this.userY+1] = pathCharacter
                                this.userY += 1
                                this.gapCross()
                            } else {
                                this.noPowerUp()
                            }
                        }
                    } else {
                        console.log (this.outOfBounds())
                        }
                    break
                case 'winner':
                    this.cheat()
                    break     
                default: 
                    console.log('Wrong Input! Type w to go Up, s to go Down, a to go Left, d to go Right')           
            }
        }
    }
    newGame () {
        const start = prompt('\nWould you like to start a new game? Y/N: ')
        if (start.toLowerCase() != 'y') {
            console.log(`\nOkay! :(`)
        } 
        else {
            console.log('Choose your difficulty by typing the corresponding number\n'+
            '3: Easy\n'+
            '2: Medium\n'+
            '1: Hard\n')
            this.lives = prompt('Your choice: ')
            console.log(`Let\'s start! You have ${this.lives} lives left.`)
            console.log('\nHere is how it goes: '+'\n'+
            '1. You start at the top left of the map.'+'\n'+
            '2. You need to find the hat (^) by walking through the grass ('+fieldCharacter+')'+'\n'+
            '3. You lose if you go outside the map, or if you land in a hole (0)'+'\n'+
            '4. Type w to go Up, s to go Down, a to go Left, d to go Right '+'\n'+
            '5: Once you start making your moves, you will not be able to view your current position on the field.\n'+
            '5. Good Luck!'+'\n'+'\n'+
            '↓ You are here')
            while (this.level <5 ) {    
                this.newField(this.level)
                field1.print()
                console.log('\n')
                while (this.field[this.hatX][this.hatY] != pathCharacter){
                    if (this.lives != 0){
                        let input = prompt('Where would you like to go? Your Choice: ')
                        input = input.toLowerCase()
                        this.move(input) 
                    } else {
                        console.log(this.lostGame())
                        break
                    }
                }
                if (this.field[this.hatX][this.hatY] === pathCharacter) {
                    console.log(this.wonGame())
                    this.level += 1
                } 
                else { 
                    return 
                }
            }
            console.log('You just finished the trail version of the game. In order to get access to the full version, please email g.satwik@gmail.com')   
        }
    }
}



field1 = new Field()
console.log(field1.newGame())
//console.log(field1.newField(5,5),field1.newField2())