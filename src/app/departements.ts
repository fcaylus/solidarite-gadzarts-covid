import departementsJSON from "../data/departements.json";
import {DepartementsHashMap} from "../data/interfaces/departement";

export const getDepartementsHashMap = (): DepartementsHashMap => {
    let map: DepartementsHashMap = {};
    for (const dep of departementsJSON) {
        map[dep.code] = {
            code: dep.code,
            name: dep.name
        }
    }

    return map;
};
