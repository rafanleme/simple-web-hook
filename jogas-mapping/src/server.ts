import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/callback/payment-successful", (req: Request, res: Response) => {
    const payload = req.body;

    console.log(payload);

    return res.status(200);
});

export { app };
