import {Request, Response, Router} from 'express';
import {apiKeyMiddleware} from "../middlewares/api_key.middleware";
import {PaymentController} from "../../../application/controllers/payment.controller";

export function paymentRoutes(controller: PaymentController): Router {
    const router = Router();
    router.get('/pay', apiKeyMiddleware, (req: Request, res: Response) => {
        controller.payment(req, res).then(() => {});
    })
    return router;
}