import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    toolbar: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        paddingRight: theme.spacing(1),
        fontWeight: "bold"
    },
    logo: {
        maxHeight: 32,
        marginRight: theme.spacing(2),
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
}));

/**
 * Header displayed on every page.
 */
export default function PageHeader() {
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <AppBar color="default" position="fixed">
                <Toolbar className={classes.toolbar}>
                    <img src="/favicon-32x32.png" alt={process.env.appName} className={classes.logo}/>
                    <Typography className={classes.title} variant="h5" noWrap>
                        {process.env.appName}
                    </Typography>
                </Toolbar>
            </AppBar>
        </header>
    );
}
