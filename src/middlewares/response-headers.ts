import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) =>
{
    //Check is API KEY present in the request (in request headers or in query params)
    const apiKey: any = req.headers['API_KEY'] || req.query['API_KEY'] || req.headers['api_key'];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, API_KEY');
    res.setHeader('Access-Control-Request-Headers', 'API_KEY')

    if (req.method === "OPTIONS")
    {
        next();
        return;
    }

    if ((!apiKey || apiKey != process.env.API_KEY) && req.url.match(/api/i))
    {
        res.status(401).json({ message: "Invalid or missing API KEY" })
        return;
    }

    next();
}