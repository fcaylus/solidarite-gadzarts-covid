import React from "react";
import App from "next/app";
import {ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/app/theme";
import Page from "../src/app/components/page/Page";

/**
 * Main App component
 */
class WebApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    // Render the main component
    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Page {...this.props} />
            </ThemeProvider>
        );
    }
}

export default WebApp;
