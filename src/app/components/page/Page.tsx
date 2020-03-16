import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {AppProps} from "next/app";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const useStyles = makeStyles((theme: Theme) => ({
    offset: theme.mixins.toolbar
}));

/**
 * Default page component used by the app
 */
export default function Page(props: AppProps) {
    const classes = useStyles();
    const {Component, pageProps} = props;

    return (
        <React.Fragment>
            <PageHeader/>
            <div className={classes.offset}/>
            <Component {...pageProps} />
            <PageFooter/>
        </React.Fragment>
    );
}
