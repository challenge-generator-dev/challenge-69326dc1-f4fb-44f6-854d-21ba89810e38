import { Request, Response, NextFunction } from 'express';
import { ProductAlreadyExistsError, ProductNotFoundError, InvalidProductDataError } from '../services/product.service';

export interface ErrorResponse {
    success: boolean;
    message: string;
    error?: {
        type: string;
        details?: string;
    };
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(`[Error] ${err.name}: ${err.message}`);
    console.error(err.stack);

    if (err instanceof ProductAlreadyExistsError) {
        const response: ErrorResponse = {
            success: false,
            message: 'Conflicto al crear el producto',
            error: {
                type: 'CONFLICT',
                details: err.message,
            },
        };
        res.status(409).json(response);
        return;
    }

    if (err instanceof ProductNotFoundError) {
        const response: ErrorResponse = {
            success: false,
            message: 'Producto no encontrado',
            error: {
                type: 'NOT_FOUND',
                details: err.message,
            },
        };
        res.status(404).json(response);
        return;
    }

    if (err instanceof InvalidProductDataError) {
        const response: ErrorResponse = {
            success: false,
            message: 'Datos invalidos',
            error: {
                type: 'BAD_REQUEST',
                details: err.message,
            },
        };
        res.status(400).json(response);
        return;
    }

    if (err.name === 'ValidationError') {
        const response: ErrorResponse = {
            success: false,
            message: 'Error de validacion de datos',
            error: {
                type: 'VALIDATION_ERROR',
                details: err.message,
            },
        };
        res.status(400).json(response);
        return;
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const response: ErrorResponse = {
            success: false,
            message: 'Error de autenticacion',
            error: {
                type: 'UNAUTHORIZED',
                details: 'Token de autenticacion invalido o expirado',
            },
        };
        res.status(401).json(response);
        return;
    }

    if (err.name === 'MongoError' || err.name === 'MongoServerError') {
        const response: ErrorResponse = {
            success: false,
            message: 'Error de base de datos',
            error: {
                type: 'DATABASE_ERROR',
                details: 'Error al procesar la solicitud en la base de datos',
            },
        };
        res.status(500).json(response);
        return;
    }

    const response: ErrorResponse = {
        success: false,
        message: 'Error interno del servidor',
        error: {
            type: 'INTERNAL_SERVER_ERROR',
            details: process.env.NODE_ENV === 'development' ? err.message : 'Ha ocurrido un error inesperado',
        },
    };

    res.status(500).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
    const response: ErrorResponse = {
        success: false,
        message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
        error: {
            type: 'NOT_FOUND',
            details: 'La ruta solicitada no existe en el servidor',
        },
    };
    res.status(404).json(response);
};

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};