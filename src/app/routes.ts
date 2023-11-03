import {Express} from "express";
import healthRoutes from "./adapters/express/routes/health.route";
import {ServiceContainer} from "./containers/service.container";
import {InvoiceController} from "./application/controllers/invoice.controller";
import {invoiceRoutes} from "./adapters/express/routes/invoice.route";

export function routes(app: Express, container: ServiceContainer){
    const invoiceController = new InvoiceController(container.getInvoiceService());
    app.use('/api/v1/health', healthRoutes);
    app.use('/api/v1/invoice', invoiceRoutes(invoiceController));
}