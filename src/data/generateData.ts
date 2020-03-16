import parse from "csv-parse/lib/es5/sync";
import fs from "fs";
import {PG, PGHashMap} from "./interfaces/PG";
import capitalize from "../capitalize";
import padNumber from "../padNumber";
import Fuse from "fuse.js";
import departementsJSON from "./departements.json";
import {DATA_DIR, PGS_HASHMAP_FILE, PGS_LIST_FILE} from "./pgs";

/**
 * Format the dump.csv data file and save it in JSON format. dump.csv should contains the answers from the GForm
 * This file must be run before the server is launch, so the data are in the correct format at runtime
 */
const csvData = fs.readFileSync("dump.csv").toString();
const jsonData = parse(csvData, {
    auto_parse: true,
    skip_empty_lines: true
});

const fuseComparator = new Fuse(departementsJSON, {
    caseSensitive: false,
    shouldSort: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: ["name"]
});

/*
 * Parse the data and check them
 * The mail is used as a primary key, so if someone is present twice, only save the last occurrence
 */
let pgList: { [email: string]: PG } = {};

// Skip the header line
for (let i=1; i < jsonData.length; i++) {
    const rawPG = jsonData[i];
    let rawDepartements = rawPG[5];
    let pg: PG = {
        email: rawPG[1],
        nom: rawPG[3],
        prenom: rawPG[4],
        departements: [],
        ville: rawPG[6],
        tbk: rawPG[7],
        proms: rawPG[8],
        telephone: rawPG[9]
    };

    // Format the names
    pg.email = pg.email.trim();
    pg.nom = capitalize(pg.nom.trim());
    pg.prenom = capitalize(pg.prenom.trim());
    pg.ville = pg.ville.replace(",", "/")
        .replace(";", "/")
        .replace("+", "/")
        .split("/").map(ville => capitalize(ville.trim())).join(" / ");

    pg.tbk = pg.tbk.trim().toLocaleUpperCase();
    pg.proms = pg.proms.trim();

    // For telephone, do some checks
    pg.telephone = pg.telephone.trim();
    if (pg.telephone.startsWith("+33")) {
        pg.telephone = pg.telephone.replace("+33", "0");
    }
    if (pg.telephone.length === 9) {
        pg.telephone = "0" + pg.telephone;
    }
    if (pg.telephone.length === 11 && pg.telephone.startsWith("00")) {
        pg.telephone = pg.telephone.slice(1);
    }
    if (pg.telephone.length === 11 && pg.telephone.startsWith("33")) {
        pg.telephone = "0" + pg.telephone.slice(2);
    }

    // For departement, find the nearest match
    rawDepartements = rawDepartements.replace("+", "/").replace(",", "/").replace(";", "/")
        .replace("ou", "/").replace("-", "/").replace(/ *\([^)]*\) */g, "");

    for (let departement of rawDepartements.split("/")) {
        departement = departement.trim();
        if (!isNaN(Number(departement))) {
            departement = padNumber(parseInt(departement), 2);
        } else {
            const result = fuseComparator.search(departement)[0];
            if (result) {
                departement = result.item.code;
            } else {
                // Try to remove all non digits
                departement = departement.replace(/\D/g, "");
                if (!isNaN(Number(departement))) {
                    departement = padNumber(parseInt(departement), 2);
                } else {
                    console.log("Cannot find:", departement, "for pg", pg.email);
                    continue;
                }
            }
        }

        pg.departements.push(departement);
    }

    // Remove duplicates
    pg.departements = pg.departements.filter((dep, i) => pg.departements.indexOf(dep) === i);

    // Override the previous PG with the same mail if it exists
    pgList[pg.email] = pg;
}

// Write to FS
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}
fs.writeFileSync(DATA_DIR + PGS_LIST_FILE, JSON.stringify(Object.values(pgList), undefined, 2));

// Create a hashmap sorted by departements
let hashMap: PGHashMap = {};

for (const pg of Object.values(pgList)) {
    for (const departement of pg.departements) {
        if (!hashMap[departement]) {
            hashMap[departement] = [pg];
        } else {
            hashMap[departement].push(pg);
        }
    }
}

// Write to FS
fs.writeFileSync(DATA_DIR + PGS_HASHMAP_FILE, JSON.stringify(hashMap, undefined, 2));
