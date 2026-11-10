import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/product.controller';
import { createValidationMiddleware, validateProductCreate, validateProductUpdate } from '../middlewares/validation.middleware';

const router: Router = Router();
const productController = new ProductController();

const validateProductCreateInput = createValidationMiddleware(validateProductCreate);
const validateProductUpdateInput = createValidationMiddleware(validateProductUpdate);

router.post('/', 
  validateProductCreateInput, 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productController.handleCreateProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', 
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await productController.handleListProducts(_req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productController.handleGetProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', 
  validateProductUpdateInput,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productController.handleUpdateProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await productController.handleDeleteProduct(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;