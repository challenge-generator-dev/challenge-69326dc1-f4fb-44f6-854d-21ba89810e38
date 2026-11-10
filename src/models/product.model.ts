import 'reflect-metadata';
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class Product {
    id?: string;
    name!: string;
    price!: number;
    stock!: number;
    category!: string;

    constructor(data?: Partial<Product>) {
        if (data) {
            this.id = data.id;
            this.name = data.name ?? '';
            this.price = data.price ?? 0;
            this.stock = data.stock ?? 0;
            this.category = data.category ?? '';
        }
    }

    static fromPlain(data: Record<string, unknown>): Product {
        const instance = plainToInstance(Product, data);
        const errors = validateSync(instance, { whitelist: true });
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.map((e: ValidationError) => e.toString()).join(', ')}`);
        }
        return instance;
    }

    toPlain(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
            category: this.category,
        };
    }
}

export class ProductCreateDto {
    name!: string;
    price!: number;
    stock!: number;
    category!: string;

    constructor(data?: Partial<ProductCreateDto>) {
        if (data) {
            this.name = data.name ?? '';
            this.price = data.price ?? 0;
            this.stock = data.stock ?? 0;
            this.category = data.category ?? '';
        }
    }

    static fromRequest(data: unknown): ProductCreateDto {
        const instance = plainToInstance(ProductCreateDto, data as Record<string, unknown>);
        const errors = validateSync(instance, { whitelist: true });
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.map((e: ValidationError) => e.toString()).join(', ')}`);
        }
        return instance;
    }

    validate(): string[] {
        const errors: string[] = [];
        
        if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
            errors.push('name must be a non-empty string');
        }
        
        if (typeof this.price !== 'number' || this.price <= 0) {
            errors.push('price must be a positive number');
        }
        
        if (typeof this.stock !== 'number' || this.stock < 0) {
            errors.push('stock must be a non-negative number');
        }
        
        if (!this.category || typeof this.category !== 'string' || this.category.trim().length === 0) {
            errors.push('category must be a non-empty string');
        }
        
        return errors;
    }
}

export class ProductUpdateDto {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;

    constructor(data?: Partial<ProductUpdateDto>) {
        if (data) {
            this.name = data.name;
            this.price = data.price;
            this.stock = data.stock;
            this.category = data.category;
        }
    }

    static fromRequest(data: unknown): ProductUpdateDto {
        const instance = plainToInstance(ProductUpdateDto, data as Record<string, unknown>);
        const errors = validateSync(instance, { whitelist: true, skipMissingProperties: true });
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.map((e: ValidationError) => e.toString()).join(', ')}`);
        }
        return instance;
    }

    hasAnyProperty(): boolean {
        return this.name !== undefined || 
               this.price !== undefined || 
               this.stock !== undefined || 
               this.category !== undefined;
    }

    validate(): string[] {
        const errors: string[] = [];
        
        if (this.name !== undefined && (typeof this.name !== 'string' || this.name.trim().length === 0)) {
            errors.push('name must be a non-empty string');
        }
        
        if (this.price !== undefined && (typeof this.price !== 'number' || this.price <= 0)) {
            errors.push('price must be a positive number');
        }
        
        if (this.stock !== undefined && (typeof this.stock !== 'number' || this.stock < 0)) {
            errors.push('stock must be a non-negative number');
        }
        
        if (this.category !== undefined && (typeof this.category !== 'string' || this.category.trim().length === 0)) {
            errors.push('category must be a non-empty string');
        }
        
        return errors;
    }
}