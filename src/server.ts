import { BodyParser } from 'body-parser';
import express, { Request, Response, Application } from 'express';

const bodyParser: BodyParser = require('body-parser');

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production')
    require('dotenv').config();

const env: any = process.env;
const app: Application = express();
const responseHeaders: any = require('./middlewares/response-headers')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORS Middleware
app.use(responseHeaders)

const routes = require('./routes/default');
app.use("/api", routes);

//Any route, in case nothing else is a match
app.use("*", (req: Request, res: Response) =>
{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(env.PORT || 3000, env.HOST || "0.0.0.0", () =>
{
    console.log(`Server is running on ${env.HOST}:${env.PORT}`)
})