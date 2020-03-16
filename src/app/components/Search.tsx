import React, {useEffect, useRef, useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import departementsJSON from "../../data/departements.json";

const departements = Object.values(departementsJSON);

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
    },
    line: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 200,
        flexGrow: 1,
    },
    button: {
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: "50%"
    },
    footerText: {
        paddingTop: theme.spacing(1),
        marginLeft: "auto",
        width: "fit-content"
    }
}));

interface SearchProps {
    value: string;
    handleChange: (newValue: string) => void;
    handleClick: () => void;
    fetching: boolean;
    pgCount?: number;
}

export default function Search(props: SearchProps) {
    const classes = useStyles();

    const inputLabel = useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    return (
        <Box className={classes.root}>
            <Paper elevation={5} className={classes.paper}>
                <Box className={classes.line}>
                    <Typography variant="h6" component="p">
                        Quel est ton département ?
                    </Typography>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="select-departement-label">
                            Départements
                        </InputLabel>
                        <Select
                            labelId="select-departement-label"
                            id="select-departement"
                            value={props.value}
                            onChange={(event: React.ChangeEvent<{ value: any }>) => props.handleChange(event.target.value.toString())}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">
                                <em>Non selectioné</em>
                            </MenuItem>

                            {departements.map((dep, index) => (
                                <MenuItem key={index} value={dep.code} disableRipple disableTouchRipple>
                                    {dep.code + " - " + dep.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button onClick={() => props.handleClick()}
                        variant="contained" color="primary"
                        className={classes.button}
                        disabled={props.fetching}>
                    Rechercher ...
                </Button>
            </Paper>
            {props.pgCount && (
                <Typography variant="subtitle2" className={classes.footerText} color="primary">
                    {props.pgCount} PGs ont répondu à l'appel.
                </Typography>
            )}
        </Box>
    );
}
