import redis from '../../lib/redis'


// This file is unnecessary.
export default async function handler(req, res) {

    const accountID = await JSON.parse(req.body).accountID

    console.log("accountID:", accountID)

    const getResult = await redis.get(accountID);

    console.log("getResult:", getResult)

    res.status(200).json({ result: getResult })
}
