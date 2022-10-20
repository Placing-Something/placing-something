import { Handlers, Status } from "$fresh/server.ts";
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts";
import redis from "../../communication/redis.ts";

const expected = (a: number, b: number) => 1/(1+Math.pow(10,((b-a)/400)));
const updatedRating = (expected: number, actual: number, current: number) => Math.round(current+32*(actual-expected));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const handler: Handlers = {
  async POST(req, _ctx) {
    const body = await req.json()
    if (body) {
      const { questionnaire_id, preference } = body
      if (questionnaire_id !== null && preference !== null) {
        const questionnaireKey = `questionnaires:${questionnaire_id}`
        const terms = await redis.lrange(questionnaireKey, 0, 1)

        redis.del(questionnaireKey)

        if (terms && terms.length > 1 && terms[preference]) {
          const termA = terms[0]
          const termB = terms[1]
          const termARatingRaw = await redis.zscore("terms", termA) as string
          const termBRatingRaw = await redis.zscore("terms", termB) as string
          
          if (termARatingRaw !== null && termBRatingRaw !== null) {
            const termARating = parseInt(termARatingRaw)
            const termBRating = parseInt(termBRatingRaw)

            const expectedScoreA = expected(termARating, termBRating)
            const expectedScoreB = expected(termBRating, termARating)

            const adjustmentFactorA = preference == 1 ? 0 : 1
            const adjustmentFactorB = preference == 1 ? 1 : 0

            const updatedScoreA = updatedRating(expectedScoreA, adjustmentFactorA, termARating as number)
            const updatedScoreB = updatedRating(expectedScoreB, adjustmentFactorB, termBRating as number)

            redis.zrem("terms", termA)
            redis.zrem("terms", termB)
            redis.zadd("terms", updatedScoreA, termA)
            redis.zadd("terms", updatedScoreB, termB)

            return json({ status: "OK" }, { status: Status.OK })
          }
        }
      }
    }
    return json({ status: "NOT_OK" }, { status: Status.BadRequest })
  },
  async GET(_req, _ctx) {
    const result = await redis.sendCommand("zrandmember", "terms", 2)
    const uid = crypto.randomUUID();
    const array = result.array()?.filter((value) => value !== null) as string[]
    if (array) {
      await sleep(200)
      const key = `questionnaires:${uid}`
      redis.rpush(key, ...array)
      redis.expire(key, 60)
      return json({ terms: result.array(), expires_in: 60, questionnaire_id: uid }, { status: Status.OK });
    }
    return json({ status: "NOT_OK" }, { status: Status.BadRequest })
  }
};