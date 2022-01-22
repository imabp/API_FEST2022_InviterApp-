import { NextApiRequest, NextApiResponse } from "next";
import { InvitationType, sendInvitation } from "../../src/lib/github";

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, inviteCode } = await JSON.parse(req.body);
        if (!(email && inviteCode))
            return res.status(422).json({ "Error": "Check Email or Invite Code" })

        if (inviteCode < 999999)
            return res.status(404).json({ "Error": "Invalid Invite Code." })


        if (email.includes(",")) {
            let emailArray = (email).split(/\s*,\s*/);
            for (let i = 0; i < emailArray.length; i++) {
                const invitationPayload: InvitationType = {
                    email: emailArray[i].trim(),
                    inviteCode: +inviteCode as number
                }
                const sent = await sendInvitation(invitationPayload)
                if (!sent)
                    return res.status(500).json({
                        "Error": "Please Try Again!"
                    })
                }
         return res.status(201).end();
        }
        const invitationPayload: InvitationType = {
            email: email,
            inviteCode: +inviteCode as number
        }
        const sent = await sendInvitation(invitationPayload)
        if (!sent)
            return res.status(500).json({
                "Error": "Please Try Again!"
            })
        return res.status(201).end();

    } catch (error) {
        return res.status(500).end();
    }

}
export default Auth;