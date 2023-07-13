import { Router, Request, Response } from "express";
import { FileSystemController } from "../controllers/filesystem";

const router = Router();
const fss: FileSystemController = new FileSystemController();

/*
    Get a list of an existing paths that can be used
*/
router.get("/", async (req: Request, res: Response) =>
{
    const result = await fss.getCurrentFiles(req.query)
        .catch((error) =>
        {
            return new Error(error);
        });

    if (result instanceof Error)
        res.status(400).json(result);

    else
        res.status(200).json(result)
})

module.exports = router;