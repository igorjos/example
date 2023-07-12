import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) =>
{
    //Check is API KEY present in the request (in request headers or in query params)
    const apiKey: any = req.headers['API_KEY'] || req.query['API_KEY'];

    if (!apiKey || apiKey != process.env.API_KEY)
    {
        res.status(401).json({ message: "Invalid or missing API KEY" })
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    next();
}