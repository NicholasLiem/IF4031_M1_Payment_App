import {Express} from "express";
import healthRoutes from "./adapters/express/routes/health.route";
import {ServiceContainer} from "./containers/service.container";
import {InvoiceController} from "./application/controllers/invoice.controller";
import {invoiceRoutes} from "./adapters/express/routes/invoice.route";
import {paymentRoutes} from "./adapters/express/routes/payment.route";
import {PaymentController} from "./application/controllers/payment.controller";

export function routes(app: Express, container: ServiceContainer){
    const invoiceController = new InvoiceController(container.getInvoiceService());
    const paymentController = new PaymentController(container.getInvoiceService());
    app.use('/api/v1/health', healthRoutes);
    app.use('/api/v1/invoice', invoiceRoutes(invoiceController));
    app.use('/api/v1/payment', paymentRoutes(paymentController));
}