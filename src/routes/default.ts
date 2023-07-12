import { Router, Request, Response } from "express";
const filesystem = require('./filesystem');

const router = Router();

router.use('/filesystem', filesystem)

module.exports = router;