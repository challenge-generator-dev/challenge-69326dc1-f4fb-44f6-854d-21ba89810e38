import { Product } from '../models/product.model';
import { IProductRepository } from '../repositories/product.repository';

export class ProductAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ProductAlreadyExistsError';
    }
}

export class ProductNotFoundError extends Error {
    constructor(id: string) {
        super(`Producto con ID ${id} no encontrado`);
        this.name = 'ProductNotFoundError';
    }
}

export class InvalidProductDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidProductDataError';
    }
}

export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    async createProduct(data: { name: string; price: number; stock: number; category: string }): Promise<Product> {
        if (!data.name || data.name.trim().length === 0) {
            throw new InvalidProductDataError('El nombre del producto es requerido');
        }

        if (data.price < 0) {
            throw new InvalidProductDataError('El precio no puede ser negativo');
        }

        if (data.stock < 0) {
            throw new InvalidProductDataError('El stock no puede ser negativo');
        }

        if (!data.category || data.category.trim().length === 0) {
            throw new InvalidProductDataError('La categoria del producto es requerida');
        }

        const existingProducts = await this.productRepository.listProducts();
        const productExists = existingProducts.some(
            p => p.name.toLowerCase() === data.name.toLowerCase()
        );

        if (productExists) {
            throw new ProductAlreadyExistsError(`Ya existe un producto con el nombre "${data.name}"`);
        }

        const product = new Product({
            name: data.name.trim(),
            price: data.price,
            stock: data.stock,
            category: data.category.trim()
        });

        return await this.productRepository.createProduct(product);
    }

    async getProduct(id: string): Promise<Product> {
        if (!id || id.trim().length === 0) {
            throw new InvalidProductDataError('El ID del producto es requerido');
        }

        const product = await this.productRepository.getProduct(id);

        if (!product) {
            throw new ProductNotFoundError(id);
        }

        return product;
    }

    async updateProduct(id: string, data: { name?: string; price?: number; stock?: number; category?: string }): Promise<Product> {
        if (!id || id.trim().length === 0) {
            throw new InvalidProductDataError('El ID del producto es requerido');
        }

        const existingProduct = await this.productRepository.getProduct(id);

        if (!existingProduct) {
            throw new ProductNotFoundError(id);
        }

        if (data.price !== undefined && data.price < 0) {
            throw new InvalidProductDataError('El precio no puede ser negativo');
        }

        if (data.stock !== undefined && data.stock < 0) {
            throw new InvalidProductDataError('El stock no puede ser negativo');
        }

        if (data.name !== undefined && data.name.trim().length === 0) {
            throw new InvalidProductDataError('El nombre del producto no puede estar vacio');
        }

        if (data.category !== undefined && data.category.trim().length === 0) {
            throw new InvalidProductDataError('La categoria del producto no puede estar vacia');
        }

        if (data.name) {
            const allProducts = await this.productRepository.listProducts();
            const nameExists = allProducts.some(
                p => p.id !== id && p.name.toLowerCase() === data.name!.toLowerCase()
            );

            if (nameExists) {
                throw new ProductAlreadyExistsError(`Ya existe otro producto con el nombre "${data.name}"`);
            }
        }

        const updateData: Partial<Product> = {};

        if (data.name !== undefined) updateData.name = data.name.trim();
        if (data.price !== undefined) updateData.price = data.price;
        if (data.stock !== undefined) updateData.stock = data.stock;
        if (data.category !== undefined) updateData.category = data.category.trim();

        return await this.productRepository.updateProduct(id, updateData);
    }

    async deleteProduct(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new InvalidProductDataError('El ID del producto es requerido');
        }

        const existingProduct = await this.productRepository.getProduct(id);

        if (!existingProduct) {
            throw new ProductNotFoundError(id);
        }

        await this.productRepository.deleteProduct(id);
    }

    async listProducts(): Promise<Product[]> {
        return await this.productRepository.listProducts();
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        if (!category || category.trim().length === 0) {
            throw new InvalidProductDataError('La categoria es requerida');
        }

        const allProducts = await this.productRepository.listProducts();
        return allProducts.filter(
            p => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    async updateStock(id: string, quantity: number): Promise<Product> {
        if (!id || id.trim().length === 0) {
            throw new InvalidProductDataError('El ID del producto es requerido');
        }

        const product = await this.productRepository.getProduct(id);

        if (!product) {
            throw new ProductNotFoundError(id);
        }

        const newStock = product.stock + quantity;

        if (newStock < 0) {
            throw new InvalidProductDataError('Stock insuficiente para realizar la operacion');
        }

        return await this.productRepository.updateProduct(id, { stock: newStock });
    }
}