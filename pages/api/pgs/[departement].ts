import {NextApiRequest, NextApiResponse} from "next";
import {OK} from "http-status-codes";
import compareStrings from "../../../src/compareStrings";
import {getPgsHashMap} from "../../../src/data/pgs";

/**
 * Return the list of PGs for the specified "departement"
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    let {departement} = req.query;
    departement = departement.toString();

    const pgsMap = getPgsHashMap();
    let data = pgsMap[departement];

    if (!data) {
        data = [];
    }

    // Sort by "ville"
    data.sort((a, b) => {
        return compareStrings(a.ville, b.ville);
    });

    res.setHeader("Content-Type", "application/json");
    return res.status(OK).json(data);
}
