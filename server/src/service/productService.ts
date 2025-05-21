import fs from 'fs';
import path from 'path';
import { ProductsData } from '../models/product'

const initFS = (): string => {
    const dataDir = path.join(__dirname, '../data');
    const productsPath = path.join(dataDir, 'products.json');
    
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    if (!fs.existsSync(productsPath)) {
        fs.writeFileSync(productsPath, JSON.stringify({ products: [] }, null, 2));
    }

    return productsPath;
}

export const readProducts = (): ProductsData => {
    const productsPath = initFS();
    const data = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(data);
};

export const writeProducts = (data: ProductsData) => {
    const productsPath = initFS();
    fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
};
