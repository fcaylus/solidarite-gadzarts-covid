import {PG, PGHashMap} from "./interfaces/PG";
import fs from "fs";

export const DATA_DIR = ".data/";
export const SAMPLE_DATA_DIR = "sample-data/";
export const PGS_HASHMAP_FILE = "pgs_hashmap.json";
export const PGS_LIST_FILE = "pgs_list.json";

let pgsList: PG[];
let pgsHashMap: PGHashMap;

const getDataDir = () => {
    return process.env.sampleWebsite ? SAMPLE_DATA_DIR : DATA_DIR;
};

export const getPgsHashMap = (): PGHashMap => {
    if (!pgsHashMap) {
        // Load the file
        pgsHashMap = JSON.parse(fs.readFileSync(getDataDir() + PGS_HASHMAP_FILE).toString());
    }

    return pgsHashMap;
};

export const getPgsList = (): PG[] => {
    if (!pgsList) {
        // Load the file
        pgsList = JSON.parse(fs.readFileSync(getDataDir() + PGS_LIST_FILE).toString());
    }

    return pgsList;
};
