import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { IFormProps } from "./Form"
import { Istate } from "../state"

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}))

interface ISnackbarError extends IFormProps {}

export const SnackbarError: React.FC<ISnackbarError> = ({
    appState,
    setAppState,
}) => {
    const classes = useStyles()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }

        setAppState((prev: Istate) => {
            return { ...prev, Error: false }
        })
    }

    return (
        <div className={classes.root}>
            <Snackbar
                open={appState.Error}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    Вы используйте не латинские символы! Переключите раскладку!
                </Alert>
            </Snackbar>
        </div>
    )
}
