import {Request, Response, NextFunction} from "express";
import {ResponseUtil} from "../../../utils/response.utils";

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }

    const tokenWithoutBearer = token.substring(7);

    try {
        if (tokenWithoutBearer === process.env.TICKET_API_KEY) {
            next();
        } else {
            return ResponseUtil.sendError(res, 401, "Unauthorized", null);
        }
    } catch (error) {
        return ResponseUtil.sendError(res, 401, "Unauthorized", null);
    }
}

