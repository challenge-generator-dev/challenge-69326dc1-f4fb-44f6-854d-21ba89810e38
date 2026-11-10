import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, ValidationChain } from 'express-validator';

export const validateProductCreate: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del producto es requerido')
        .isLength({ min: 1, max: 100 })
        .withMessage('El nombre debe tener entre 1 y 100 caracteres'),
    body('price')
        .notEmpty()
        .withMessage('El precio es requerido')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un numero positivo'),
    body('stock')
        .notEmpty()
        .withMessage('El stock es requerido')
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un numero entero no negativo'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categoria es requerida')
        .isLength({ min: 1, max: 50 })
        .withMessage('La categoria debe tener entre 1 y 50 caracteres'),
];

export const validateProductUpdate: ValidationChain[] = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('El nombre del producto no puede estar vacio')
        .isLength({ min: 1, max: 100 })
        .withMessage('El nombre debe tener entre 1 y 100 caracteres'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser un numero positivo'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un numero entero no negativo'),
    body('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('La categoria no puede estar vacia')
        .isLength({ min: 1, max: 50 })
        .withMessage('La categoria debe tener entre 1 y 50 caracteres'),
];

export const validateProductId: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del producto es requerido')
        .isLength({ min: 1 })
        .withMessage('El ID del producto no es valido'),
];

export const validateCategoryQuery: ValidationChain[] = [
    param('category')
        .trim()
        .notEmpty()
        .withMessage('La categoria es requerida')
        .isLength({ min: 1, max: 50 })
        .withMessage('La categoria debe tener entre 1 y 50 caracteres'),
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: 'path' in err ? err.path : 'unknown',
            message: err.msg,
        }));

        res.status(400).json({
            success: false,
            message: 'Error de validacion',
            errors: formattedErrors,
        });
        return;
    }

    next();
};

export const createValidationMiddleware = (validations: ValidationChain[]): any => {
    return [
        ...validations,
        validate,
    ];
};

export const validateProductInput = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: 'path' in err ? err.path : 'unknown',
            message: err.msg,
        }));

        res.status(400).json({
            success: false,
            message: 'Error de validación de producto',
            errors: formattedErrors,
        });
        return;
    }

    next();
};