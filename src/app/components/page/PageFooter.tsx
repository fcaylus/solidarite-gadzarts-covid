import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {Box, Divider, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& > *:not(:first-child)": {
            marginTop: theme.spacing(2)
        }
    },
    copyright: {
        width: "100%",
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        "& > *": {
            fontWeight: "bold"
        }
    },
    logo: {
        width: 40,
        height: 40
    },
    inlineDivider: {
        width: "80%",
        backgroundColor: theme.palette.primary.contrastText
    },
    contactContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    contactRoot: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            alignItems: "center",
            "&:first-child": {
                paddingBottom: theme.spacing(2)
            }
        }
    },
    contactName: {
        fontWeight: "bold"
    }
}));

interface ContactProps {
    name: string;
    email: string;
    phone: string;
}

const Contact = (props: ContactProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.contactRoot}>
            <Typography variant="body2" color="inherit" className={classes.contactName}>
                {props.name}
            </Typography>
            <Typography variant="body2" color="inherit">
                {props.phone}
            </Typography>
            <Link color="inherit" underline="always" href={"mailto:" + props.email}>
                {props.email}
            </Link>
        </Box>
    );
};


/**
 * Footer displayed on every page.
 */
export default function PageFooter() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Divider/>
            <footer>
                <Box className={classes.root}>
                    <img src="/logo-white-40x40.png" alt="Logo UE" className={classes.logo}/>
                    <Typography variant="body2" color="inherit" align="center">
                        {process.env.appName}
                    </Typography>
                    <Divider className={classes.inlineDivider}/>
                    <Typography variant="body2" color="inherit" align="center">
                        Si tu as des questions, ou un problème, contacte directement:
                    </Typography>
                    <Box className={classes.contactContainer}>
                        <Contact name="K'coo 22-176 (KIN 217)" email="formation@ueam.org" phone="06 99 64 41 40"/>
                        <Contact name={"Dure\u00B2x 158 (KIN 217)"} email="vice-president@ueam.org" phone="06 75 09 72 97"/>
                    </Box>
                    <Typography variant="body2" color="inherit" align="center">
                        {"Usiné par l'UE 217 et "}
                        <Link color="inherit" underline="always" href="https://www.linkedin.com/in/fabien-caylus/"
                              target="_blank"
                              rel="noopener">
                            {"(Bar)\u00B2oüf 3-170"}
                        </Link>
                        {" en collaboration avec la "}
                        <Link color="inherit" underline="always" href="https://www.arts-et-metiers.asso.fr/"
                              target="_blank"
                              rel="noopener">
                            SOCE
                        </Link>
                        {"."}
                    </Typography>
                </Box>
                <Box className={classes.copyright}>
                    <Typography variant="body2" color="inherit" align="left">
                        © Copyright 2020 - Union des Élèves Arts et Métiers
                    </Typography>
                </Box>
            </footer>
        </React.Fragment>
    );
}
