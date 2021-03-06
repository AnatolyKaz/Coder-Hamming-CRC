import React from "react"
import { Container, createMuiTheme, MuiThemeProvider } from "@material-ui/core"
import { Navbar } from "./components/Navbar"
import { Form } from "./components/Form"
import { Istate } from "./state"
import { SnackbarError } from "./components/SnackbarError"
import { ResultCalculating } from "./components/ResultCalculating"
import { Content } from "./components/Content"

interface IAppProps {
    state: Istate
}

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "10px",
            },
        },
    },
})

const App: React.FC<IAppProps> = ({ state }) => {
    const [appState, setAppState] = React.useState(state)

    return (
        <Container>
            <>
                <MuiThemeProvider theme={theme}>
                    <Navbar />
                    <Form appState={appState} setAppState={setAppState} />
                    {appState.calculation ? (
                        <ResultCalculating appState={appState} />
                    ) : null}
                    <Content />
                </MuiThemeProvider>
                <SnackbarError appState={appState} setAppState={setAppState} />
            </>
        </Container>
    )
}

export default App
