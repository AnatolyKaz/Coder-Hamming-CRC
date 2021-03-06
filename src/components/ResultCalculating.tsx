import React from "react"
import { Istate } from "../state"

interface IResultCalculatingProps {
    appState: Istate
}

export const ResultCalculating: React.FC<IResultCalculatingProps> = ({
    appState,
}) => {
    return (
        <>
            <div>
                Последовательность на выходе кодера Хэмминга:{" "}
                {appState.hamming.outputCodeSecuence}
            </div>
            {appState.hamming.indexError ? (
                <div>Номер ошибочного бита: {appState.hamming.indexError}</div>
            ) : null}
            <div>
                Последовательность на входе декодера:{" "}
                {appState.hamming.inputCodeSecuence}
            </div>
            <div>
                Сообщение на выходе декодера: {appState.hamming.outputString}
            </div>
            <div>
                Последовательность на выходе кодера CRC:{" "}
                {appState.crc.outputCodeSecuence}
            </div>
            <div>
                Последовательность на входе декодера:{" "}
                {appState.crc.inputCodeSecuence}
            </div>
            <div>Сообщение на выходе декодера: {appState.crc.outputString}</div>
        </>
    )
}
