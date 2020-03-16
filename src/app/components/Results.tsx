import React, {useState} from "react";
import {makeStyles, Theme, useTheme} from "@material-ui/core/styles";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import {PG} from "../../data/interfaces/PG";
import PersonIcon from '@material-ui/icons/Person';
import {getDepartementsHashMap} from "../departements";
import formatPhoneNumber from "../../formatPhoneNumber";
import Link from "@material-ui/core/Link";
import colors from "../colors";

const departementsHashMap = getDepartementsHashMap();

const useStyles = makeStyles((theme: Theme) => ({
    background: {
        marginTop: theme.spacing(2),
        backgroundColor: colors.white,
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    root: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
    },
    list: {},
    listItem: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: 0,
        paddingRight: 0
    },
    itemText: {
        paddingRight: theme.spacing(1)
    },
    button: {
        marginLeft: "auto"
    },
    dialogList: {
        "& > li": {
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    noPg: {
        textAlign: "center",
        padding: theme.spacing(2)
    }
}));

interface ResultsProps {
    pgsList: PG[];
    selectedDep: string;
}

const Results = React.forwardRef((props: ResultsProps, ref: any) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedPG, setSelectedPG] = useState<PG | undefined>(undefined);

    const handleClickOpen = (pg: PG) => {
        setSelectedPG(pg);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box className={classes.background}>
            <Box className={classes.root}>
                <div ref={ref}/>
                {props.pgsList.length === 0 && (
                    <Box>
                        <Typography variant="h6" className={classes.noPg}>
                            Désolé, mais aucun PG n'est disponible dans
                            le {props.selectedDep + " (" + departementsHashMap[props.selectedDep].name + ")"}.
                        </Typography>
                        <Typography variant="body1" className={classes.noPg}>
                            Tu peux peut-être essayer un département voisin, ou contacter directement ton tabagn's le
                            plus
                            proche pour voir si ils ont des PGs disponibles !
                        </Typography>
                    </Box>
                )}
                {props.pgsList.length !== 0 && (
                    <React.Fragment>
                        <Typography variant="h6" className={classes.noPg}>
                            PGs disponibles dans
                            le {props.selectedDep + " (" + departementsHashMap[props.selectedDep].name + ")"}.
                        </Typography>
                        <List className={classes.list}>
                            {props.pgsList.map((pg, index) => {
                                const name = pg.prenom + " " + pg.nom + " (" + pg.tbk + pg.proms + ")";
                                return (
                                    <ListItem key={index} className={classes.listItem}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={name} secondary={pg.ville} className={classes.itemText}/>
                                        <Button color="primary" variant="contained" onClick={() => handleClickOpen(pg)}
                                                className={classes.button}>
                                            Contacter
                                        </Button>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </React.Fragment>
                )}
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle
                        id="responsive-dialog-title">{"Coordonées de " + (selectedPG ? selectedPG.prenom + " " + selectedPG.nom : "")}</DialogTitle>
                    <DialogContent>
                        {selectedPG && (
                            <List className={classes.dialogList}>
                                <ListItem>
                                    <ListItemText>
                                        <b>Nom:</b> {selectedPG.prenom + " " + selectedPG.nom}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>Prom's:</b> {selectedPG.tbk + selectedPG.proms}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>Ville:</b> {selectedPG.ville}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>Téléphone:</b> {formatPhoneNumber(selectedPG.telephone)}
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <b>E-mail:</b>&nbsp;
                                        <Link underline="always" href={"mailto:" + selectedPG.email}>
                                            {selectedPG.email}
                                        </Link>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
});

export default Results;
