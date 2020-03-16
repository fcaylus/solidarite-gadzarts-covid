import React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    header: {
        paddingBottom: theme.spacing(3),
    },
    list: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        width: "100%",
        flexWrap: "wrap"
    },
    icon: {
        margin: theme.spacing(1),
        objectFit: "contain",
        maxWidth: "min(40%, 150px)"
    }
}));

const iconsList = [
    {
        icon: "/gestes/laver-main.png",
        alt: "Se laver les mains régulièrement"
    },
    {
        icon: "/gestes/mouchoir.png",
        alt: "Utiliser un mouchoir à usage unique"
    },
    {
        icon: "/gestes/tousser.png",
        alt: "Tousser ou éternuer dans son coude"
    },
    {
        icon: "/gestes/mains.png",
        alt: "Limiter les contacts directs ou indirects"
    },
];

const IconsList = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h6" component="p" color="primary" className={classes.header}>
                Rappel des gestes barrières
            </Typography>
            <Box className={classes.list}>
                {iconsList.map((icon, index) => (
                    <img key={index} src={icon.icon} alt={icon.alt} className={classes.icon}/>
                ))}
            </Box>
        </Box>
    );
};

export default IconsList;
