import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

interface SubscribePayload {
    URL: string;
}

interface SubscribeModel {
    clientId: string;
    URL: string;
    service: string;
}

const subscribes: SubscribeModel[] = [];

app.post("/web-hook/payment-successful/:clientId/subscribes", (req: Request, res: Response) => {
    const { URL } = req.body as SubscribePayload;
    const { clientId } = req.params;

    subscribes.push({
        clientId,
        URL,
        service: "payment-successful"
    });

    console.log("oi")

    return res.status(201).send();
});

app.get("/web-hook/payment-successful/subscribes", (req: Request, res: Response) => {

    res.send(subscribes);
});

app.post("/payments/:clientId", (req: Request, res: Response) => {
    const { clientId } = req.params;

    const webHook = subscribes.find(s => s.clientId === clientId && s.service === "payment-successful");

    if (webHook) {
        axios.post(webHook.URL, { message: "O pagamento do cliente Xyz foi realizado com sucesso" });
    }

    res.send("Pagamento realizado com sucesso.");
});

export { app };
