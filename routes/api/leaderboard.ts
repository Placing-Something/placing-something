import { Handlers, Status } from "$fresh/server.ts";
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts";
import redis from "../../communication/redis.ts";

export const handler: Handlers = {
    async GET(req, _ctx) {
        const revealAll = new URL(req.url).searchParams.get("revealAll") || false

        if (revealAll == "true") {
            const leaderboardTop = await redis.zrevrange("terms", 0, 100, { withScore: true }) as string[]
            const mappedLeaderboardTop = [];
            const leaderboardLength: number = +(await redis.zcard("terms"))
            for (let i = 0; i < leaderboardTop.length; i += 2) {
                mappedLeaderboardTop.push({ term: leaderboardTop[i], rating: +leaderboardTop[i+1] })
            }
            return json({ top: mappedLeaderboardTop, bottom: [], length: leaderboardLength })
        } else {
            const leaderboardTop = await redis.zrevrange("terms", 0, 4, { withScore: true }) as string[]
            const leaderboardLength: number = +(await redis.zcard("terms"))
            let leaderboardBottom: string[] = []
            if (leaderboardLength-5 > 0) {
                leaderboardBottom = await redis.zrange("terms", 0, Math.min(leaderboardLength-6, 4), { withScore: true }) as string[]
            }
            const mappedLeaderboardTop = [];
            const mappedLeaderboardBottom = [];
            for (let i = 0; i < leaderboardTop.length; i += 2) {
                mappedLeaderboardTop.push({ term: leaderboardTop[i], rating: +leaderboardTop[i+1] })
            }
            for (let i = leaderboardBottom.length-2; i >= 0; i -= 2) {
                mappedLeaderboardBottom.push({ term: leaderboardBottom[i], rating: +leaderboardBottom[i+1] })
            }
            return json({ top: mappedLeaderboardTop, bottom: mappedLeaderboardBottom, length: leaderboardLength }, { status: Status.OK })
        }
    }
}