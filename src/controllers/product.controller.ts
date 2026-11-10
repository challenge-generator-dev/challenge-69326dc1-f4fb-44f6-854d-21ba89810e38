import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ProductCreateDto, ProductUpdateDto } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    const productRepository = new ProductRepository();
    this.productService = new ProductService(productRepository);
  }

  async handleCreateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = ProductCreateDto.fromRequest(req.body);
      
      const createdProduct = await this.productService.createProduct({
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        category: productData.category
      });
      
      res.status(201).json({
        id: createdProduct.id,
        name: createdProduct.name,
        price: createdProduct.price,
        stock: createdProduct.stock,
        category: createdProduct.category
      });
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('ya existe') || err.message.includes('duplicate')) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw error;
    }
  }

  async handleGetProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    
    const product = await this.productService.getProduct(id);
    
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.status(200).json({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category
    });
  }

  async handleUpdateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const productData = ProductUpdateDto.fromRequest(req.body);

    const updateData: { name?: string; price?: number; stock?: number; category?: string } = {};
    
    if (productData.hasAnyProperty()) {
      if (productData.name !== undefined) updateData.name = productData.name;
      if (productData.price !== undefined) updateData.price = productData.price;
      if (productData.stock !== undefined) updateData.stock = productData.stock;
      if (productData.category !== undefined) updateData.category = productData.category;
    }

    try {
      const updatedProduct = await this.productService.updateProduct(id, updateData);
      
      res.status(200).json({
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        category: updatedProduct.category
      });
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('no encontrado') || err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
        return;
      }
      if (err.message.includes('ya existe') || err.message.includes('duplicate')) {
        res.status(409).json({ error: err.message });
        return;
      }
      throw error;
    }
  }

  async handleDeleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await this.productService.deleteProduct(id);
      res.status(204).json({});
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('no encontrado') || err.message.includes('not found')) {
        res.status(404).json({ error: err.message });
        return;
      }
      throw error;
    }
  }

  async handleListProducts(_req: Request, res: Response): Promise<void> {
    const products = await this.productService.listProducts();
    
    const response = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category
    }));

    res.status(200).json(response);
  }
}