# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `test/product.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261109223818458), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: Implementación de CRUD de productos con Express y DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de la funcionalidad básica de CRUD — objetivo: Implementar las operaciones básicas de CRUD para productos en DynamoDB. — entregable (NO resolver): API REST funcional con las operaciones CRUD básicas y pruebas unitarias.
- Fase 2: Implementación de validaciones y manejo de errores — objetivo: Implementar las validaciones adicionales y el manejo de errores para las operaciones CRUD. — entregable (NO resolver): API REST con validaciones adicionales y manejo de errores, y pruebas unitarias actualizadas.
- Fase 3: Optimización y decisiones de diseño — objetivo: Optimizar la implementación y tomar decisiones de diseño basadas en trade-offs. — entregable (NO resolver): API REST optimizada con decisiones de diseño documentadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: src/main.ts ===
import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error.middleware';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { configureAWS } from './config/aws.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const dynamoDBClient = new DynamoDBClient(configureAWS());
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

app.use(express.json());

app.use('/products', productRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

export { app, docClient };

// === ARCHIVO: package.json ===
{
  "name": "product-crud-api",
  "version": "1.0.0",
  "description": "API CRUD para gestión de productos con Express y DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.654.0",
    "@aws-sdk/lib-dynamodb": "3.654.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "dotenv": "16.4.5",
    "express": "4.21.0",
    "express-validator": "7.2.0",
    "inversify": "^6.0.2",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "22.5.5",
    "@types/supertest": "6.0.2",
    "@typescript-eslint/eslint-plugin": "7.18.0",
    "@typescript-eslint/parser": "7.18.0",
    "eslint": "8.57.0",
    "jest": "29.7.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "typescript": "5.7.2"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": [
      "**/*.test.ts"
    ],
    "moduleFileExtensions": [
      "ts",
      "js",
      "json"
    ]
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": false,
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"],
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "test"]
}

// === ARCHIVO: src/models/product.model.ts ===
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

// === ARCHIVO: src/repositories/product.repository.ts ===
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../models/product.model';
import { injectable } from 'inversify';

export interface IProductRepository {
    createProduct(product: Product): Promise<Product>;
    getProduct(id: string): Promise<Product | null>;
    updateProduct(id: string, product: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    listProducts(): Promise<Product[]>;
}

@injectable()
export class ProductRepository implements IProductRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string = process.env.DYNAMODB_TABLE_NAME || 'Products';

    constructor() {
        const dynamoClient = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
        this.client = DynamoDBDocumentClient.from(dynamoClient);
    }

    async createProduct(product: Product): Promise<Product> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                id: product.id || this.generateId(),
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category
            },
            ConditionExpression: 'attribute_not_exists(id)'
        });

        await this.client.send(command);
        return product;
    }

    async getProduct(id: string): Promise<Product | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id }
        });

        const response = await this.client.send(command);
        if (!response.Item) {
            return null;
        }

        return new Product({
            id: response.Item.id,
            name: response.Item.name,
            price: response.Item.price,
            stock: response.Item.stock,
            category: response.Item.category
        });
    }

    async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
        const updateExpressions: string[] = [];
        const expressionAttributeValues: Record<string, unknown> = {};
        const expressionAttributeNames: Record<string, string> = {};

        if (product.name !== undefined) {
            updateExpressions.push('#name = :name');
            expressionAttributeNames['#name'] = 'name';
            expressionAttributeValues[':name'] = product.name;
        }

        if (product.price !== undefined) {
            updateExpressions.push('price = :price');
            expressionAttributeValues[':price'] = product.price;
        }

        if (product.stock !== undefined) {
            updateExpressions.push('stock = :stock');
            expressionAttributeValues[':stock'] = product.stock;
        }

        if (product.category !== undefined) {
            updateExpressions.push('category = :category');
            expressionAttributeValues[':category'] = product.category;
        }

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: 'SET ' + updateExpressions.join(', '),
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW'
        });

        const response = await this.client.send(command);
        if (!response.Attributes) {
            throw new Error('Product not found');
        }

        return new Product({
            id: response.Attributes.id,
            name: response.Attributes.name,
            price: response.Attributes.price,
            stock: response.Attributes.stock,
            category: response.Attributes.category
        });
    }

    async deleteProduct(id: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id }
        });

        await this.client.send(command);
    }

    async listProducts(): Promise<Product[]> {
        const command = new ScanCommand({
            TableName: this.tableName
        });

        const response = await this.client.send(command);
        if (!response.Items) {
            return [];
        }

        return response.Items.map(item => new Product({
            id: item.id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            category: item.category
        }));
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

// === ARCHIVO: src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/products', productRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorHandler(err, _req, res, _next);
});

export default app;

// === ARCHIVO: src/routes/product.routes.ts ===
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

// === ARCHIVO: src/controllers/product.controller.ts ===
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

// === ARCHIVO: src/services/product.service.ts ===
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

// === ARCHIVO: src/middlewares/validation.middleware.ts ===
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

// === ARCHIVO: src/middlewares/error.middleware.ts ===
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

// === ARCHIVO: src/utils/dynamo.util.ts ===
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { AWS_CONFIG } from '../config/aws.config';

export function createDynamoDBClient(): DynamoDBClient {
    const config: DynamoDBClientConfig = {
        region: AWS_CONFIG.region,
        credentials: AWS_CONFIG.credentials,
    };

    if (AWS_CONFIG.endpoint) {
        config.endpoint = AWS_CONFIG.endpoint;
    }

    return new DynamoDBClient(config);
}

export function createDocClient(client: DynamoDBClient): DynamoDBDocumentClient {
    return DynamoDBDocumentClient.from(client, {
        marshallOptions: {
            removeUndefinedValues: true,
            convertClassInstanceToMap: true,
        },
        unmarshallOptions: {
            wrapNumbers: false,
        },
    });
}

export async function putItem<T>(docClient: DynamoDBDocumentClient, tableName: string, item: T): Promise<T> {
    const command = new PutCommand({
        TableName: tableName,
        Item: item as Record<string, unknown>,
    });
    await docClient.send(command);
    return item;
}

export async function getItem<T>(docClient: DynamoDBDocumentClient, tableName: string, key: Record<string, unknown>): Promise<T | null> {
    const command = new GetCommand({
        TableName: tableName,
        Key: key,
    });
    const result = await docClient.send(command);
    return (result.Item as T) || null;
}

export async function updateItem<T>(
    docClient: DynamoDBDocumentClient,
    tableName: string,
    key: Record<string, unknown>,
    updateExpression: string,
    expressionAttributeValues: Record<string, unknown>
): Promise<T> {
    const command = new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    });
    const result = await docClient.send(command);
    return result.Attributes as T;
}

export async function deleteItem(docClient: DynamoDBDocumentClient, tableName: string, key: Record<string, unknown>): Promise<void> {
    const command = new DeleteCommand({
        TableName: tableName,
        Key: key,
    });
    await docClient.send(command);
}

export async function scanTable<T>(docClient: DynamoDBDocumentClient, tableName: string): Promise<T[]> {
    const command = new ScanCommand({
        TableName: tableName,
    });
    const result = await docClient.send(command);
    return (result.Items as T[]) || [];
}

// === ARCHIVO: src/config/aws.config.ts ===
import { Credentials, Provider } from '@aws-sdk/types';

interface AwsConfig {
    region: string;
    credentials: Credentials | Provider<Credentials>;
    endpoint?: string;
    tableName: string;
}

function getEnvVar(name: string, defaultValue?: string): string {
    const value = process.env[name];
    if (!value && !defaultValue) {
        throw new Error(`La variable de entorno ${name} no está definida`);
    }
    return value || defaultValue!;
}

function getOptionalEnvVar(name: string): string | undefined {
    return process.env[name];
}

function createCredentials(): Credentials | Provider<Credentials> {
    const accessKeyId = getOptionalEnvVar('AWS_ACCESS_KEY_ID');
    const secretAccessKey = getOptionalEnvVar('AWS_SECRET_ACCESS_KEY');
    const sessionToken = getOptionalEnvVar('AWS_SESSION_TOKEN');

    if (accessKeyId && secretAccessKey) {
        const credentials: Credentials = {
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined,
        };
        return credentials;
    }

    if (process.env.AWS_PROFILE) {
        const fromProfile: Credentials = {
            accessKeyId: '',
            secretAccessKey: '',
        };
        return fromProfile;
    }

    throw new Error('AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY deben estar definidos');
}

export const AWS_CONFIG: AwsConfig = {
    region: getEnvVar('AWS_REGION', 'us-east-1'),
    credentials: createCredentials(),
    endpoint: getOptionalEnvVar('DYNAMODB_ENDPOINT'),
    tableName: getEnvVar('DYNAMODB_TABLE_NAME', 'products'),
};

export function isLocalEnvironment(): boolean {
    return !!getOptionalEnvVar('DYNAMODB_ENDPOINT') ||
           getOptionalEnvVar('AWS_SAM_LOCAL') === 'true' ||
           getOptionalEnvVar('LOCALSTACK_HOST') !== undefined;
}

export function getAwsConfig(): AwsConfig {
    return AWS_CONFIG;
}

export function configureAWS(): Pick<AwsConfig, 'region' | 'credentials' | 'endpoint'> {
    return {
        region: AWS_CONFIG.region,
        credentials: AWS_CONFIG.credentials,
        endpoint: AWS_CONFIG.endpoint,
    };
}

// === ARCHIVO: test/product.test.ts ===
import request from 'supertest';
import { Express } from 'express';

describe('Product API', () => {
    let app: Express;
    const testProduct = {
        name: 'Test Product',
        price: 99.99,
        stock: 10,
        category: 'Electronics'
    };

    beforeAll(() => {
        app = require('../src/app').default;
    });

    describe('POST /products', () => {
        it('should create a new product', async () => {
            const response = await request(app)
                .post('/products')
                .send(testProduct)
                .expect('Content-Type', /json/);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(testProduct.name);
        });

        it('should return 400 for invalid product data', async () => {
            const invalidProduct = { name: '', price: -10 };
            const response = await request(app)
                .post('/products')
                .send(invalidProduct);
            expect(response.status).toBe(400);
        });

        it('should return 400 for duplicate product name', async () => {
            await request(app)
                .post('/products')
                .send(testProduct);
            const response = await request(app)
                .post('/products')
                .send(testProduct);
            expect(response.status).toBe(409);
        });
    });

    describe('GET /products/:id', () => {
        it('should return a product by id', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const response = await request(app)
                .get(`/products/${productId}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(productId);
        });

        it('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .get('/products/non-existent-id');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const updateData = { name: 'Updated Product', price: 149.99 };
            const response = await request(app)
                .put(`/products/${productId}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.price).toBe(updateData.price);
        });

        it('should return 400 for negative price', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const response = await request(app)
                .put(`/products/${productId}`)
                .send({ price: -50 });
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /products/:id', () => {
        it('should delete an existing product', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const response = await request(app)
                .delete(`/products/${productId}`);
            expect(response.status).toBe(204);

            const getResponse = await request(app)
                .get(`/products/${productId}`);
            expect(getResponse.status).toBe(404);
        });

        it('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .delete('/products/non-existent-id');
            expect(response.status).toBe(404);
        });
    });

    describe('GET /products', () => {
        it('should return all products', async () => {
            await request(app).post('/products').send(testProduct);

            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});

// === ARCHIVO: README.md ===
# API CRUD de Productos con Express y DynamoDB

Este proyecto implementa una API REST para la gestión de productos en una tienda en línea, utilizando Express como framework web y DynamoDB como base de datos.

## Requisitos Previos

- Node.js 22.x
- npm 10.x
- Credenciales de AWS configuradas en variables de entorno (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
- Tabla de DynamoDB creada en la región configurada

## Instalación

```bash
npm install
```

Este comando instala todas las dependencias definidas en package.json.

## Compilación

```bash
npm run build
```

Compila el código TypeScript en JavaScript en la carpeta dist/.

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

Inicia el servidor con ts-node, recargando cambios automáticamente.

### Modo producción

```bash
npm run build && npm start
```

Primero compila y luego inicia el servidor desde dist/.

## Pruebas

```bash
npm test
```

Ejecuta las pruebas unitarias con Jest.

```bash
npm run test:watch
```

Ejecuta pruebas en modo watch para desarrollo.

## Estructura del Proyecto

```
├── src/
│   ├── main.ts                 # Punto de entrada de la aplicación
│   ├── app.ts                  # Configuración de Express
│   ├── config/
│   │   └── aws.config.ts       # Configuración de AWS SDK
│   ├── models/
│   │   └── product.model.ts    # Modelo de dominio y DTOs
│   ├── repositories/
│   │   └── product.repository.ts  # Capa de acceso a datos
│   ├── services/
│   │   └── product.service.ts  # Lógica de negocio
│   ├── controllers/
│   │   └── product.controller.ts  # Manejadores de endpoints
│   ├── routes/
│   │   └── product.routes.ts   # Definición de rutas
│   ├── middlewares/
│   │   ├── validation.middleware.ts  # Validación de requests
│   │   └── error.middleware.ts       # Manejo de errores
│   └── utils/
│       └── dynamo.util.ts      # Utilidades de DynamoDB
├── test/
│   └── product.test.ts         # Pruebas unitarias
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /products | Crear un nuevo producto |
| GET | /products | Listar todos los productos |
| GET | /products/:id | Obtener un producto por ID |
| PUT | /products/:id | Actualizar un producto |
| DELETE | /products/:id | Eliminar un producto |

### Ejemplos de uso

#### Crear producto

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming",
    "price": 1299.99,
    "stock": 15,
    "category": "Electronics"
  }'
```

#### Listar productos

```bash
curl http://localhost:3000/products
```

#### Obtener producto por ID

```bash
curl http://localhost:3000/products/{id}
```

#### Actualizar producto

```bash
curl -X PUT http://localhost:3000/products/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming Pro",
    "price": 1499.99,
    "stock": 10,
    "category": "Electronics"
  }'
```

#### Eliminar producto

```bash
curl -X DELETE http://localhost:3000/products/{id}
```

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 3000 |
| AWS_REGION | Región de AWS | us-east-1 |
| AWS_ACCESS_KEY_ID | Clave de acceso AWS | - |
| AWS_SECRET_ACCESS_KEY | Clave secreta AWS | - |
| DYNAMODB_TABLE_NAME | Nombre de la tabla | products |

## Reglas de Negocio

- Los nombres de productos no pueden estar duplicados
- Los precios no pueden ser negativos
- El stock debe ser mayor o igual a 0
- La categoría es obligatoria

## Tecnologías

- **Runtime**: Node.js 22
- **Lenguaje**: TypeScript 5.7
- **Framework**: Express 4.21
- **Base de datos**: DynamoDB (AWS SDK v3)
- **Validación**: express-validator 7.2
- **Testing**: Jest 29.7

## Licencia

ISC

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
