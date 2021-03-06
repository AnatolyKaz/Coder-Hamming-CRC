import { TbinaryArray } from "../../state"
///=======================Coder======================================
export function CoderHamming(inputString: string): TbinaryArray {
    let binArray: TbinaryArray = getBinaryArray(inputString)
    let codeArray: TbinaryArray = fillCodeArray(binArray)

    codeArray = getCodeArray(codeArray, binArray)

    let ControlBinArray: TbinaryArray = getControlBinArray(codeArray)
    let outputCode: TbinaryArray = getOutputCode(codeArray, ControlBinArray)

    return outputCode
}

export function getOutputCode(codeArray: TbinaryArray, ControlBinArray: TbinaryArray): TbinaryArray {
    let maxPow: number = getMaxPow(codeArray)
    let outputArray: TbinaryArray = codeArray.map((binNum, index) => {
    
        return isPow(maxPow, index + 1) ? ControlBinArray.shift() : binNum
    } )

    return outputArray
}

export function getControlBinArray (codeArray: TbinaryArray): TbinaryArray {
    let filteredArray: TbinaryArray = Filter(codeArray).map( array => {
        let length: number = array.filter( item => (item === '1' ? 1 : 0)).length

        return length % 2 === 0 ? '0' : '1' 
    })

    return filteredArray
}

export function Filter(codeArray: TbinaryArray): TbinaryArray[] {
    let filterArray: TbinaryArray[] = []
    let maxPow: number = getMaxPow(codeArray)

    const oneFilter: TbinaryArray = codeArray.filter(( value, index ) => ((index + 1) % 2 !== 0 ? 1 : 0 ))

    filterArray.push(oneFilter)

    for (let i = 1; i <= maxPow; i++) {
        filterArray.push(engineFilter(2 ** i, codeArray))
    }

    return filterArray
}

export function engineFilter(power: number, codeArray: TbinaryArray): TbinaryArray {
    let outputArray: TbinaryArray = []
    let flag: number = 0

    for (let i = power - 1; i < codeArray.length; i++) {
        if (flag < power) {
            outputArray.push(codeArray[i])
        } 
        
        flag++
        
        if (flag === power * 2) {
            flag = 0
        }
    }

    return outputArray
}


export function getBinaryArray(inputString: string): TbinaryArray {
    let stringArray: string[] = inputString.split('') 
    let binStringArray: string[] = stringArray.map( letter => (`${(letter.charCodeAt(0)).toString(2)}`))

    binStringArray = binStringArray.map( (str: string) => { 

        if (str.length === 7) {
            str = `0${str}`
        } else if (str.length === 6) {
            str = `00${str}`
        }

        return str
    })

    let outputArray: TbinaryArray = binStringArray.join('').split('') as ('1' | '0' | undefined)[]
    return outputArray
}


export function getCodeArray(codeArray: TbinaryArray, binArray: TbinaryArray): TbinaryArray {
    let maxPow: number = getMaxPow(codeArray)
    let outputArray = codeArray.map((binNum, index: number) => {
    
        return isPow(maxPow, index + 1) ? binNum : binArray.shift()
    } )

    return  outputArray
}



export function fillCodeArray(binArray: TbinaryArray): TbinaryArray {
    let outputArray: TbinaryArray = []
    let maxPow: number = getMaxPow(binArray)

    for (let index = 0; index < binArray.length + maxPow + 1; index++) {
        outputArray.push('0')
    }

    return outputArray
}

export function isPow(maxPow: number, index: number): boolean {

    for (let i = 0; i <= maxPow; i++) {

        if (index === 2 ** i ) {
            return true
        } 
    }

    return false
}
///=======================Coder======================================
///===========================Decoder================================
export function DecoderHamming(inputCodeArray: TbinaryArray): string {
    let recalcArray = recalcInputСode(inputCodeArray)
    let ControlBinArray = getControlBinArray(recalcArray)
    let recalcMessageArray = getOutputCode(recalcArray, ControlBinArray)
    let indexErrorsArray = compareArrays(inputCodeArray, recalcMessageArray)
    let indexError = findIndexError(indexErrorsArray)
    let fixedMessage = fixError(indexError, inputCodeArray)
    let message = decodeMessege(fixedMessage)

    return message
}

export function decodeMessege(fixedMessage: TbinaryArray): string {
    let maxPow: number = getMaxPow(fixedMessage)
    let binMessage = fixedMessage.filter( (letter, index) => (isPow(maxPow, index + 1) ? 0 : 1 ))
    let countLetters: number = binMessage.length / 8
    let binArray: string[] = []

    for (let index = 0; index < countLetters; index++) {
        binArray.push(binMessage.splice(0, 8).join(''))
    }

    let message: string = binArray.map( binStr => ( parseInt( binStr, 2))).map( num => ( String.fromCharCode(num))).join('')

    return message
}

export function fixError(indexError: null | number, inputCodeArray: TbinaryArray): TbinaryArray {

    if (typeof indexError === 'number') {
        let outputArray: TbinaryArray = inputCodeArray.map( (letter, index) => {

            if (index === indexError) {
                if (letter === '0') {
                    letter = '1'
                } else {
                    letter = '0'
                }
            }
    
            return letter
        })
    
        return outputArray
    } else {
        return inputCodeArray
    }
}

export function findIndexError(indexErrorsArray: number[]): null | number {

    if (indexErrorsArray.length === 0) {
        return null
    } else {
        return indexErrorsArray.reduce((prev, next) => (prev + next)) - 1
    }
}

export function compareArrays(inputCodeArray: TbinaryArray, recalcMessageArray: TbinaryArray): number[] {
    let indexErrors: number[] = []

    for (let index = 0; index < inputCodeArray.length; index++) {
        if (inputCodeArray[index] !== recalcMessageArray[index] ) {
            indexErrors.push(index + 1)
        }
    }

    return indexErrors
}

export function recalcInputСode(inputCodeArray: TbinaryArray): TbinaryArray {
    let maxPow: number = getMaxPow(inputCodeArray)
    return inputCodeArray.map( (letter, index) => (isPow(maxPow, index + 1) ? '0' : letter))
}
///===========================Decoder================================

export function errorLink(outputCode: TbinaryArray): TbinaryArray {
    let max: number = outputCode.length
    let indexError: number = Math.floor(Math.random() * (max + 1))
    let outputArray = outputCode.map( (binNum, index: number) => {
        if (indexError === index) {
            if (binNum === '1') {
                binNum = '0'
            }else {
                binNum = '1'
            }
        }
        return binNum
    })

    return outputArray
}

export function getMaxPow(array: TbinaryArray): number {
    return Math.floor(Math.log2(array.length))
}

