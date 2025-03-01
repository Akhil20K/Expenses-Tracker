import Category from '../model/categoryModel.js'
import asyncHandler from 'express-async-handler';

const categoryController = {
    // Look up for the Category by its Name
    lookup: asyncHandler(async(name, user) => {
        const categoryExists = await Category.findOne(
            { 
                name: name, 
                user: user
            }
        );
        return categoryExists;
    }),
    // Add a new Category
    add: asyncHandler(async(req, res) => {
        const { name, type } = req.body;
        if(!name || !type){
            throw new Error('Both name and type must be specified');
        }
        const normalizedName = name.toLowerCase();
        // Validate the type of category
        const validTypes = ["income", "expense"];
        if(!validTypes.includes(type)){
            throw new Error('Invalid Category type: ' + type);
        }
        // Check the category name exists in the database
        const categoryExists = await categoryController.lookup(normalizedName, req.user);
        if(categoryExists){
            throw new Error('Category already exists');
        }
        const newCategory = await Category.create({
            user: req.user,
            name: normalizedName,
            type: type
        })
        res.status(201).json(newCategory)
    }),
    // Show the list of categories
    lists: asyncHandler(async(req, res) => {
        const listCategories = await Category.find({ user: req.user });
        res.status(200).json(listCategories);
    }),
    // Update the Category by its id
    update: asyncHandler(async(req, res) => {
        const categoryId = req.params.id;
        // Validate the category type
        if(req.body.type){
            const validTypes = ["income", "expense"];
            if(!validTypes.includes(req.body.type)){
                throw new Error('Invalid Category type: ' + req.body.type);
            }
        }
        // Check if the category is already in the list
        const category = await Category.findById(categoryId);
        if(!category || String(category.user) !== String(req.user)){
            throw new Error('Category not found or user not authorized');
        }
        category.name = req.body.name || category.name;
        category.type = req.body.type || category.type;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    }),
    // Delete the category by its id
    delete: asyncHandler(async(req, res) => {
        // Get the category by ID 
        const category = await Category.findById(req.params.id);
        // Check the category belongs to User or not
        if(category && String(category.user) === String(req.user)){
            await Category.findByIdAndDelete(req.params.id);
            res.json({
                message: "Category Removed",
            })
        }
    })
}

export default categoryController;