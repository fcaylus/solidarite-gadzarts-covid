import {NextApiRequest, NextApiResponse} from "next";
import {OK} from "http-status-codes";
import {getPgsList} from "../../../src/data/pgs";

/**
 * Return the number of PGs
 */
export default async (_req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "application/json");
    return res.status(OK).json({count: getPgsList().length});
}
