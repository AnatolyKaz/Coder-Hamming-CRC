import React from "react"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Istate } from "../state"
import {
    CoderHamming,
    compareArrays,
    DecoderHamming,
    errorLink,
    findIndexError,
} from "./CoderHamming/CoderHamming"
import { CoderCRC, DecoderCRC } from "./CoderCRC/CoderCRC"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "25ch",
        },
    })
)

export interface IFormProps {
    setAppState(callback: (state: Istate) => Istate): void
    appState: Istate
}

export const Form: React.FC<IFormProps> = ({ appState, setAppState }) => {
    const classes = useStyles()

    const handleError = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAppState((prev: Istate) => {
            return { ...prev, errorTransmission: event.target.checked }
        })
    }

    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setAppState((prev: Istate) => {
            if (event.target.value.charCodeAt(0) <= 120) {
                return { ...prev, inputString: event.target.value }
            } else if (event.target.value !== "") {
                return { ...prev, inputString: "", Error: true }
            } else {
                return { ...prev, inputString: "" }
            }
        })
    }

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault()

        setAppState((prev: Istate) => {
            let hammingCodeSecuence = CoderHamming(prev.inputString)
            let errHamming = errorLink(hammingCodeSecuence)
            let indexHammingErr = findIndexError(
                compareArrays(hammingCodeSecuence, errHamming)
            )
            let state: Istate
            if (prev.errorTransmission) {
                state = {
                    ...prev,
                    calculation: true,
                    hamming: {
                        outputCodeSecuence: hammingCodeSecuence,
                        indexError: indexHammingErr
                            ? indexHammingErr + 1
                            : null,
                        inputCodeSecuence: errHamming,
                        outputString: DecoderHamming(errHamming),
                    },
                    crc: {
                        outputCodeSecuence: CoderCRC(prev.inputString),
                        inputCodeSecuence: CoderCRC(prev.inputString),
                        outputString: DecoderCRC(
                            errorLink(CoderCRC(prev.inputString))
                        ),
                    },
                }
            } else {
                state = {
                    ...prev,
                    calculation: true,
                    hamming: {
                        outputCodeSecuence: hammingCodeSecuence,
                        indexError: null,
                        inputCodeSecuence: hammingCodeSecuence,
                        outputString: DecoderHamming(hammingCodeSecuence),
                    },
                    crc: {
                        outputCodeSecuence: CoderCRC(prev.inputString),
                        inputCodeSecuence: CoderCRC(prev.inputString),
                        outputString: DecoderCRC(CoderCRC(prev.inputString)),
                    },
                }
            }

            return state
        })
    }

    return (
        <form
            className={classes.root}
            onSubmit={submitHandler}
            noValidate
            autoComplete="off"
        >
            <TextField
                error ={appState.Error}
                id={
                    appState.Error
                        ? "filled-error-full-width"
                        : "filled-full-width"
                }
                label={
                    appState.Error
                        ? "Ошибка!"
                        : "Введите сообщение"
                }
                onChange={changeHandler}
                value={appState.inputString}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={appState.errorTransmission}
                        onChange={handleError}
                        name="ErrCheck"
                    />
                }
                label="Внести ошибку при передаче сообщения?"
            />
            <Button type="submit" variant="contained" color="primary">
                Кодировать
            </Button>
        </form>
    )
}
