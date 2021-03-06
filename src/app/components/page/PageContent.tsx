import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import {LinearProgress} from "@material-ui/core";
import clsx from "clsx";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        padding: theme.spacing(3),
        paddingBottom: 0,
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1)
        }
    }
}));

interface PageContentProps {
    pageTitle?: string;
    showProgress?: boolean

    // Random properties
    [prop: string]: any;
}

/**
 * Each page under /pages/ should use this component as a base.
 * It handles the title and the main page layout.
 */
export default function PageContent(props: PageContentProps) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Head>
                <title>
                    {process.env.appName}
                    {props.pageTitle && " - " + props.pageTitle}
                </title>
            </Head>
            {props.showProgress && <LinearProgress color="secondary"/>}
            <Container component="main" role="main" disableGutters className={clsx(props.className, classes.root)} maxWidth="md">
                {props.children}
            </Container>
        </React.Fragment>
    );
}
