import productModel from "../dao/mongo/product.model.js";
import mongoose from "mongoose";

class ProductRepository extends productModel {
    constructor() {
        super()
    }


    readProducts = async () => {
        try {
            const products = await productModel.find({})
            return products
        } catch (e) {
            console.error('Error to find products:', e)
            return null
        }}

    obtainProducts = async (limit) => {
        try {
            let productsOld = await this.readProducts()
    
            if (!limit) {
                return productsOld;
            }
    
            if (productsOld.length === 0) {
                throw new Error("Error to find products with the criteria:")
            }
    
            return productsOld.slice(0, limit)
        } catch (e) {
            console.error('Error to find products:', error)
            throw e; 
        }
    }
    
    addProduct = async (product) => {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error('Error to save products:', error);
            throw error;
        }
    }
    


    obtainProductById = async (productId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return null
            }
            const product = await productModel.findById(productId)
            if (!product) {
                return null
            }
            return product
        } catch (e) {
            console.error('Error to save products by ID:', e)
            return null
        }
    }

    updateProduct = async (id, product) => {
        try {
            const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, product, { new: true });
            if (updatedProduct) {
                return { updatedProduct, message: "Product updated" }
            } else {
                return "Product not found"
            }

        } catch (e) {
            console.error('Error to update the products', e)
            return null
        }}

    deleteProduct = async (productId) => {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(productId);
            return deletedProduct;
        } catch (e) {
            console.error('Error to delete the products', e)
            return null;
        }}


    obtainProductByLimit = async (limit) => {
        try {
            const products = await productModel.find().limit(limit);
            return products;
        } catch (e) {
            console.error('Error to find the products', e)
            return null;
        }
    }

    obtainProductByPage = async (page, productsPerPage) => {
        try {
            const products = await productModel.find().skip((page - 1) * productsPerPage).limit(productsPerPage)
            return products;
        } catch (e) {
            console.error('Error to find the products', e)
            return null;
        }
    }

    obtainProductByQuery = async (query) => {
        try {
            const products = await productModel.find({
                description: { $regex: query, $options: 'i' }
            });
            return products
        } catch (e) {
            console.error('Error to find the products', e)
            return null;
        }
    }

    obtainProductMain = async (page, limit, category, availability, sortOrder) => {
        try {
            let filter = {}
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const sortOptions = {}

            if (sortOrder === 'asc') {
                sortOptions.price = 1
            } else if (sortOrder === 'desc') {
                sortOptions.price = -1
            } else {
                throw new Error(' sortOrder must be "asc" o "desc".')
            }
            if (category != "") {
                filter.category = category;
            }
            if (availability != "") {
                filter.availability = availability;
            }
            const query = productModel.find(filter)
                .skip(startIndex)
                .limit(limit)
                .sort(sortOptions);;
            const products = await query.exec();

            const totalProducts = await productModel.countDocuments(filter);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = startIndex > 0;
            const hasNextPage = endIndex < totalProducts;
            const prevLink = hasPrevPage ? `/api/products?page=${page - 1}&limit=${limit}` : null;
            const nextLink = hasNextPage ? `/api/products?page=${page + 1}&limit=${limit}` : null;
            return {
                status: 'success',
                payload: products,
                totalPages: totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page: page,
                hasPrevPage: hasPrevPage,
                hasNextPage: hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink,
            };
        } catch {
            console.error('Error to obtain products:', error)
            return { status: 'error', payload: 'Error to obtain products:' }
        }}

    existProducts = async (id) => {
        try {
            const product = await productModel.findById(id)
            if (!product) {
                return null;
            }
            return product;
        } catch (e) {
            console.error('Error, products dont exist:', e)
            return null;
        }}

}

export default ProductRepository