import { Request, Response } from 'express';

import { readProducts } from '../service/productService'

const productController = {
    getAllProducts: (req: Request, res: Response) => {
        try {
            const { page = '1', category } = req.query;
            const pageNumber = parseInt(page as string, 10) || 1;
            const pageSize = 4;

            const productsData = readProducts();
            let products = [...productsData.products];

            // Filter by category if provided
            if (category) {
                products = products.filter(product => product.category === category);
            }

            // Sort by dateAdded (newest first)
            products.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());

            // Pagination
            const totalProducts = products.length;
            const totalPages = Math.ceil(totalProducts / pageSize);
            const startIndex = (pageNumber - 1) * pageSize;
            const endIndex = Math.min(startIndex + pageSize, totalProducts);
            const paginatedProducts = products.slice(startIndex, endIndex);

            res.json({
                products: paginatedProducts,
                pagination: {
                    currentPage: pageNumber,
                    totalPages,
                    totalProducts,
                    hasNext: endIndex < totalProducts,
                    hasPrevious: startIndex > 0
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },

    searchProducts: (req: Request, res: Response) => {
        try {
            const { q } = req.query;

            if (!q) {
                return res.status(400).json({ error: 'Search query is required' });
            }

            const productsData = readProducts();
            const searchTerm = (q as string).toLowerCase();

            const matchingProducts = productsData.products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );

            res.json(matchingProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search products' });
        }
    },

    getProduct: (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const productsData = readProducts();
            let products = [...productsData.products];

            const idx = products.findIndex(product => product.id === id);
            res.json(idx >= 0 ? products[idx] : {});
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    }
}

export default productController;
