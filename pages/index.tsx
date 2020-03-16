import React, {useEffect, useRef, useState} from "react";
import PageContent from "../src/app/components/page/PageContent";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Search from "../src/app/components/Search";
import {PG} from "../src/data/interfaces/PG";
import LocalApi from "../src/app/LocalApi";
import Results from "../src/app/components/Results";
import {Box, Typography} from "@material-ui/core";
import IconsList from "../src/app/components/IconsList";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *:not(:last-child)": {
            marginBottom: theme.spacing(2)
        },
        "& > *:last-child": {
            paddingBottom: theme.spacing(2)
        }
    },
    image: {
        maxWidth: "min(100%, 500px)"
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        textAlign: "justify",
        alignItems: "center",
        justifyContent: "center",
        "& > *": {
            width: "100%",
            padding: theme.spacing(1)
        }
    },
    title: {
        textAlign: "center"
    }
}));

/**
 * Home page
 */
export default function IndexPage() {
    const classes = useStyles();

    const [selectedDepartement, setSelectedDepartement] = useState("");
    const [lastFetchedDepartement, setLastFetchedDepartement] = useState("01");
    const [pgList, setPgList] = useState<PG[] | undefined>(undefined);
    const [fetching, setFetching] = useState(false);
    const [pgCount, setPgCount] = useState<number | undefined>(undefined);

    // Used to scroll to the result when data are fetched
    const resultsRef = useRef<HTMLElement>(null);

    // Fetch the number of PGs when the component mount
    useEffect(() => {
        LocalApi().get("pgs/count").then((result) => {
            if(result && !result.error) {
                setPgCount(result.data.count);
            }
        })
    }, []);

    /**
     * Fetch the list of PGs for the selected departement
     */
    const launchSearch = () => {
        if (selectedDepartement != "") {
            console.log("Search", selectedDepartement, "...");
            setFetching(true);
            LocalApi().get("pgs/" + selectedDepartement).then((result) => {
                if (result && !result.error) {
                    setFetching(false);
                    setPgList(result.data);
                    setLastFetchedDepartement(selectedDepartement);

                    // Scroll to results
                    if (resultsRef && resultsRef.current) {
                        window.scrollTo({
                            left: 0,
                            top: resultsRef.current.offsetTop - 70,
                            behavior: "smooth"
                        });
                    }
                }
            })
        }
    };

    return (
        <PageContent className={classes.root} showProgress={fetching}>
            <img src="/banner-500.png" alt="Banner" className={classes.image}/>
            <Box className={classes.textContainer}>
                <Typography variant="h5" component="h1" color="primary" className={classes.title}>
                    Solidarité entre Gadz pour la garde de vos enfants
                </Typography>
                <Typography variant="body1">
                    Sal's Archi,
                </Typography>
                <Typography variant="body1">
                    En ces temps difficiles la solidarité de notre communauté doit se faire ressentir et rayonner.
                    Nous savons qu'avec la fermeture des crèches et écoles vous allez avoir des difficultés à vous
                    occuper de vos enfants en journée. Les universités étant fermées les PGs sont libres en journée
                    et souhaitent se mobiliser pour vous venir en aide.
                    Nous avons recensé sur ce site les PGs volontaires pour garder vos enfants. Vous pouvez les
                    rechercher par région et prendre contact avec eux pour convenir d’un accord au cas par cas selon
                    vos besoins.
                </Typography>
                <Typography variant="body1">
                    L’UE 217
                </Typography>
            </Box>
            <Search
                value={selectedDepartement}
                handleChange={setSelectedDepartement}
                handleClick={launchSearch}
                fetching={fetching}
                pgCount={pgCount}/>
            {pgList && <Results ref={resultsRef} pgsList={pgList} selectedDep={lastFetchedDepartement}/>}
            <IconsList/>
            <Typography variant="body2">
                *En participant à cette action solidaire je suis conscient que l'UE n'est qu'un facilitateur et
                je m'engage à ne pas me retourner contre l'UE en cas de contamination de moi-même ou de
                quelqu'un d'autre.
            </Typography>
        </PageContent>
    );
}
