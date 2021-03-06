export type TbinaryArray = ('1' | '0' | undefined)[]

export interface Istate {
    inputString: string,
    Error: boolean,
    errorTransmission: boolean,
    calculation: boolean,
    hamming: IHamming,
    crc: ICRC
}

interface IHamming {
    outputCodeSecuence: TbinaryArray,
    indexError: number | null,
    inputCodeSecuence: TbinaryArray,
    outputString: string
}

interface ICRC {
    outputCodeSecuence: TbinaryArray,
    inputCodeSecuence: TbinaryArray,
    outputString: string
}

export let state = {
    inputString: '',
    Error: false,
    errorTransmission: false,
    calculation: false,
    hamming: {
        outputCodeSecuence: [],
        indexError: null,
        inputCodeSecuence: [],
        outputString: ''
    },
    crc: {
        outputCodeSecuence: [],
        inputCodeSecuence: [],
        outputString: ''
    }
}