import { Request, Response } from "express";
import { InvoiceService } from "../services/invoice.service";
import { ResponseUtil } from "../../utils/response.utils";
import { CreateInvoiceSchema } from "../../schema/invoice/create_invoice.schema";
import axios from "axios";
export class InvoiceController {
  private invoiceService: InvoiceService;

  constructor(invoiceService: InvoiceService) {
    this.invoiceService = invoiceService;
  }

  async getInvoice(req: Request, res: Response) {
    try {
      const invoiceId = req.params.invoice_id;
      const invoice = await this.invoiceService.findInvoiceById(invoiceId);

      if (invoice) {
        return ResponseUtil.sendResponse(
          res,
          200,
          "Success fetch data",
          invoice
        );
      } else {
        return ResponseUtil.sendError(res, 404, "Invoice not found", null);
      }
    } catch (error) {
      return ResponseUtil.sendError(res, 500, "Internal server error", error);
    }
  }

  async createInvoice(req: Request, res: Response) {
    try {
      const { booking_id, event_id, customer_id, seat_id, email } =
        CreateInvoiceSchema.parse(req.body);

      const createdInvoice = await this.invoiceService.createInvoice(
        booking_id,
        event_id,
        customer_id,
        seat_id,
        email
      );

      if (createdInvoice) {
        return ResponseUtil.sendResponse(
          res,
          201,
          "Invoice creation successful",
          createdInvoice
        );
      } else {
        return ResponseUtil.sendError(
          res,
          500,
          "Invoice creation failed",
          null
        );
      }
    } catch (error) {
      return ResponseUtil.sendError(res, 500, "Internal server error", error);
    }
  }

  async updateInvoice(req: Request, res: Response) {
    try {
      const { invoiceId } = req.params;
      const updatedData = req.body;

      const updatedInvoice = await this.invoiceService.updateInvoice(
        invoiceId,
        updatedData
      );
      if (updatedInvoice) {
        return ResponseUtil.sendResponse(
          res,
          200,
          "Invoice update successful",
          updatedInvoice
        );
      } else {
        return ResponseUtil.sendError(res, 404, "Invoice not found", null);
      }
    } catch (error) {
      return ResponseUtil.sendError(res, 500, "Internal server error", error);
    }
  }

  async cancelInvoice(req: Request, res: Response) {
    try {
      const bookingId = req.params.booking_id;
      const canceledInvoice = await this.invoiceService.cancelInvoice(
        bookingId
      );
      console.log(canceledInvoice)
      if (!canceledInvoice) {
        return ResponseUtil.sendError(res, 404, "Invoice not found", null);
      }
      return ResponseUtil.sendResponse(
        res,
        200,
        "Invoice update successful",
        canceledInvoice
      );
      // const invoiceData = JSON.stringify(canceledInvoice);
      // const webhookURL = process.env.WEBHOOK_URL;
      // const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;
      // const headers = {
      //   Authorization: `Bearer ${PAYMENT_API_KEY}`,
      //   "Content-Type": "application/json",
      // };
      // const axiosConfig = {
      //   headers: headers,
      // };
      // try {
      //   // @ts-ignore
      //   const response = await axios.post(webhookURL, invoiceData, axiosConfig);
      //   return ResponseUtil.sendResponse(res,200,"Booking has been cancelled",null)
      // } catch (error) {
      //   console.log(error)
      //   return ResponseUtil.sendResponse(res,500,"Internal server error",null)
      // }
    } catch (error) {
      return ResponseUtil.sendError(res, 500, "Internal server error", error);
    }
  }

  async deleteInvoice(req: Request, res: Response) {
    try {
      const invoiceId = req.params.invoice_id;
      await this.invoiceService.deleteInvoice(invoiceId);
      return ResponseUtil.sendResponse(
        res,
        200,
        "Invoice deletion successful",
        null
      );
    } catch (error) {
      return ResponseUtil.sendError(res, 500, "Internal server error", error);
    }
  }
}
