const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const gap = 'X'
const powerUp = '~'
const evil = '&'

let arr01 = [fieldCharacter,fieldCharacter,hole,fieldCharacter]
let arr02 = [fieldCharacter,fieldCharacter,hole,fieldCharacter]
let arr03 = [hole,fieldCharacter,fieldCharacter,hole]
let arr04 = [fieldCharacter,hole,fieldCharacter,fieldCharacter]
let arr1 = [fieldCharacter,fieldCharacter,fieldCharacter,hole,hole]
let arr2 = [hole,hole,fieldCharacter,fieldCharacter,hole]
let arr3 = [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole]
let arr4 = [fieldCharacter,hole,hole,hole,hole]
let arr5 = [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter]
let arr6 = [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter]
let arr7 = [hole,hole,fieldCharacter,hole,hole,hole,fieldCharacter]
let arr8 = [fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter]
let arr9 = [fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,fieldCharacter,hole]
let arr10 = [fieldCharacter,hole,hole,fieldCharacter,fieldCharacter,fieldCharacter,hole]
let arr11 = [fieldCharacter,fieldCharacter,hole,fieldCharacter,hole,hole,hole]
let arr12 = [hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter]
let arr13 = [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter] 
let arr14 = [fieldCharacter,fieldCharacter,hole,hole,hole,hole,fieldCharacter]
let arr15 = [hole,fieldCharacter,hole,hole,powerUp,hole,fieldCharacter]
let arr16 = [fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter]
let arr17 = [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,hole]
let arr18 = [hole,fieldCharacter,hole,hole,hole,hole,hole]
let arr19 = [fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,gap,fieldCharacter]


let level1 = [arr01,arr02,arr03,arr04]
let level2 = [arr1,arr2,arr3,arr4,arr5]
let level3 = [arr6,arr7,arr8,arr9,arr10,arr11,arr12]
let level5 = 
[
[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter],
[hole,hole,hole,hole,hole,gap,hole,hole,hole,powerUp],
[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],
[fieldCharacter,hole,hole,fieldCharacter,fieldCharacter,hole,hole,hole,fieldCharacter,hole],
[powerUp,fieldCharacter,hole,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],
[hole,fieldCharacter,hole,powerUp,hole,hole,hole,hole,hole,hole],
[fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole],
[fieldCharacter,hole,hole,hole,hole,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter],
[gap,hole,fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,fieldCharacter,gap],
[fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,hole,hole,hole,gap,fieldCharacter]
]

let level6 = [
[fieldCharacter,fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,hole],
[gap,gap,gap,fieldCharacter,fieldCharacter,fieldCharacter,gap],
[fieldCharacter,fieldCharacter,evil,powerUp,fieldCharacter,hole,gap],
[fieldCharacter,hole,hole,hole,hole,hole,fieldCharacter],
[fieldCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter],
[fieldCharacter,hole,fieldCharacter,fieldCharacter,fieldCharacter,hole,evil],
[powerUp,fieldCharacter,fieldCharacter,fieldCharacter,hole,hole,fieldCharacter]
]
level6.forEach(x => console.log(x.join(' ')))
//console.log('ꐦꐦꐦꐦꐦ')
//export {level1,level2,level3}