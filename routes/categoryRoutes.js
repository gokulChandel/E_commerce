import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';

   

const router = express.Router();


// routes

// Create Category 
router.post('/create-category', createCategoryController);

//Update Category
router.put('/update-category/:id', updateCategoryController);

// getAll Category
router.get('/allcategory', categoryController );

// Single Category
router.get('/single-category/:slug', singleCategoryController )

// Delete Category

router.delete('/delete-category/:id', deleteCategoryController)


export default router;