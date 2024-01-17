import express from "express"
import { obtainProducts, createProduct, deleteProduct, obtainProductById, obtainProductByLimit, obtainProductByPage, obtainProductByQuery, updateProduct } 
        from "../controllers/products.controller.js"

const productsRouter = express.Router()

productsRouter.get("/", obtainProducts)
productsRouter.get("/:pid", obtainProductById)
productsRouter.post("/", createProduct)
productsRouter.put("/:pid", updateProduct)
productsRouter.delete("/:pid", deleteProduct)

productsRouter.get("/limit/:limit", obtainProductByLimit)
productsRouter.get("/page/:page", obtainProductByPage)
productsRouter.get("/query/:query", obtainProductByQuery)

export default productsRouter