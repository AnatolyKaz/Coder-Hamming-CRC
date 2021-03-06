import { TbinaryArray } from "../../state"

const poly: string[] =   ['1','1','1','0','1','0','1','0','1']     // CRC-8 (111010101)


////===========================Coder================================
export function CoderCRC(inputString: string): TbinaryArray {
    let stringArray = inputString.split('')
    let outputCode: TbinaryArray = []

    for (let index = 0; index < stringArray.length; index++) {
        let binArray = getBinaryArray(stringArray[index])
        let preparBinArray = preparationBinArray(binArray)
        let remainderArray = divPoly(preparBinArray)
        let codedWord = concatBinArrays(binArray, remainderArray) 
        outputCode = outputCode.concat(codedWord)
    }
    return outputCode
}

export function concatBinArrays(binArray: TbinaryArray, remainderArray: TbinaryArray): TbinaryArray {
    return binArray.concat(remainderArray)
}

export function division(array: TbinaryArray): TbinaryArray {
    let remainder: TbinaryArray = []

        for (let index = 0; index <= 8 ; index++) {
            if(array[index] === poly[index]) {
                remainder.push('0')
            } else {
                remainder.push('1')
            }
        }
        
    return remainder
}

export function preparationBinArray(binArray: TbinaryArray): TbinaryArray {
    let outputArray: TbinaryArray = [...binArray]

    for (let i = 0; i < poly.length - 1; i++) {
        outputArray.push('0')
    }

    return outputArray
}

function getBinaryArray(letter: string): TbinaryArray {

    let binarySequence = (letter.charCodeAt(0)).toString(2)
    
    if (binarySequence.length === 7) {
        binarySequence = `0${binarySequence}`
    } else if (binarySequence.length === 6) {
        binarySequence = `00${binarySequence}`
    }

    return binarySequence.split('') as ('1' | '0' | undefined)[]
}
////===========================Coder================================
////===========================Decoder================================

export function DecoderCRC(inputCode: TbinaryArray): string {
    let countLetters: number = inputCode.length / 16
    let slicedCode = inputCode
    let checkMessage: string[] = []

    for (let index = 0; index < countLetters; index++) {
        let binLetter: TbinaryArray = slicedCode.splice(0, 16)
        let remainderArray = divPoly(binLetter)
        let check = checkRemainder(remainderArray)
        if (check) {
            checkMessage.push(String.fromCharCode(parseInt( binLetter.splice(0, 8).join(''), 2))) 
        } else {
            return 'Проверка не пройдена!'
        }
    }
    
    return  checkMessage.join('') 
}

export function checkRemainder(remainderArray: TbinaryArray): boolean {
    let checkArray = remainderArray.filter( binNum => ( binNum === '0' ? 0 : 1))
    
    if (checkArray.length === 0) {
        return true
    }else {
        return false
    }
}

////===========================Decoder================================

export function divPoly(preparBinArray: TbinaryArray): TbinaryArray {
    let remainderArray = division(preparBinArray)

    if (remainderArray[0] === '1' ) {
        remainderArray = division(remainderArray)
    }

    for (let i = 9; i < preparBinArray.length; i++) {
        remainderArray.shift()
        remainderArray.push(preparBinArray[i])
        remainderArray = division(remainderArray)
        
    }

    remainderArray.shift()

    return remainderArray
}
