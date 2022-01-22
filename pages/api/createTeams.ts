import { NextApiRequest, NextApiResponse } from "next"
import { createATeam } from "../../src/lib/github"

const createTeams =async(req:NextApiRequest, res:NextApiResponse)=> {
    // HIGHLY SENSITIVE ENDPOINT, NOT FOR PUBLIC USE.
    // THIS ENDPOINT SHOULD ONLY BE USED LOCALLY TO CREATE TEAMS USING LOOPS
    // AT MAX YOU CAN CREATE 100 TEAMS IN ONE LOOP, TO AVOID RATE LIMITING.
    return res.status(402).json({"UNAUTHORIZED IDENTITY":req.socket.remoteAddress as string})
}
export default createTeams