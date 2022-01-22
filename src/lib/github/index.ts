import { Octokit, App } from "octokit";

export type InvitationType = {
    email: string,
    inviteCode: number,
}
const ParentTeam = 5590445

export const sendInvitation = async ({ email, inviteCode }: InvitationType): Promise<boolean> => {
    try {
        console.log(email, typeof (inviteCode as number))
        const octokit = new Octokit({ auth: `${process.env.GITHUB_PAT}` });
        console.log("I am In the loop")
        const response = await octokit.request('POST /orgs/{org}/invitations', {
            org: 'api-fest',
            email: email,
            team_ids: [ParentTeam, inviteCode]
        })
        console.log("RESPONSE", response.status);
        if (response.status === 201)
            return true;

        return false;
    } catch (e: any) {
        return false;
    }
}
export const createATeam = async (teamName: string, parentID?: number) => {
    try {
        if (!parentID)
            parentID = ParentTeam;
        const octokit = new Octokit({ auth: `${process.env.GITHUB_PAT}` });
        const response = await octokit.request('POST /orgs/{org}/teams', {
            org: 'api-fest',
            name: teamName,
            parent_team_id: parentID,
            description: `API FEST 2022 team`,
            privacy: 'closed',
        })
        console.log("Team Created", response.status);
        if (response.status === 201)            
            return response.data.id;
        return false;
    } catch (e: any) {
        return false;
    }
}