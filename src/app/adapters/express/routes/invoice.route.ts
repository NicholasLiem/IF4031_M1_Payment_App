import { Request, Response, Router } from "express";
import { apiKeyMiddleware } from "../middlewares/api_key.middleware";
import { InvoiceController } from "../../../application/controllers/invoice.controller";

export function invoiceRoutes(controller: InvoiceController): Router {
  const router = Router();
  router.post("/", apiKeyMiddleware, (req: Request, res: Response) => {
    controller.createInvoice(req, res).then(() => {});
  });
  router.put("/cancel/:booking_id", apiKeyMiddleware, (req: Request, res: Response) => {
    controller.cancelInvoice(req, res);
  });
  router.get(
    "/:invoice_id",
    apiKeyMiddleware,
    (req: Request, res: Response) => {
      controller.getInvoice(req, res).then(() => {});
    }
  );

  router.put(
    "/:invoice_id",
    apiKeyMiddleware,
    (req: Request, res: Response) => {
      controller.updateInvoice(req, res).then(() => {});
    }
  );

  router.delete(
    "/:invoice_id",
    apiKeyMiddleware,
    (req: Request, res: Response) => {
      controller.deleteInvoice(req, res).then(() => {});
    }
  );

  return router;
}
