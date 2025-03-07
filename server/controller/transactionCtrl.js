import Transaction from '../model/transactionModel.js';
import asyncHandler from 'express-async-handler';
import validator from 'validator';
import Category from '../model/categoryModel.js';
import categoryController from './categoryCtrl.js';

const transactionController = {
    // Add a Transaction
    add: asyncHandler(async(req, res) => {
        const { categorytype, categoryname, amount, date, description } = req.body;
        if(!validator.isFloat(String(amount))){
            throw new Error('Invalid amount');
        }
        // Validate Category Type
        const validTypes = ["income", "expense"];
        if(!validTypes.includes(categorytype)){
            throw new Error('Invalid Category type: ' + categorytype);
        }
        // If the category dosen't exist then create a new category with the new category name and type
        const normalizedName = categoryname;
        var category = await categoryController.lookup(normalizedName, req.user);
        if(!category){
            const newCategory = await Category.create(
                {
                    user: req.user,
                    name: normalizedName,
                    type: categorytype,
                }
            )
            category = newCategory;
        }
        const newTransaction = await Transaction.create(
            {
                user: req.user,
                category: category,
                amount: amount,
                date: date || Date.now(),
                description: description || ""
            }
        )
        res.status(201).json(newTransaction);
    }),
    // List all the transactions of the User
    lists: asyncHandler(async(req, res) => {
        const listTransactions = await Transaction.find({ user: req.user });
        const returnList = [];
        for(const x of listTransactions) {
            const category = await Category.findById(x.category);
            const transaction = new Object();
            transaction._id = x._id;
            transaction.name = category?.name;
            transaction.type = category?.type;
            transaction.amount = x.amount;
            transaction.date = x.date;
            transaction.description = x.description;
            returnList.push(transaction);
        }
        res.status(200).json(returnList);
    }),
    // Filtering the transactions of the User
    getFilteredTransactions: asyncHandler(async(req, res) => {
        const { startDate, endDate, categoryname, categorytype } = req.query;
        let filters = { user: req.user };
        // Date Filterings
        if(startDate){
            filters.date = { ...filters.date, $gte: new Date(startDate)};
        }
        if(endDate){
            filters.date = { ...filters.date, $lte: new Date(endDate)};
        }
        // Category Filtering
        if(categoryname !== "All" || categorytype){
            let categoryQuery = {};
            if(categoryname && categoryname !== "All"){
                categoryQuery.name = categoryname;
            }
            if(categorytype){
                categoryQuery.type = categorytype;
            }
            // Collect all categories with the category filters and find them in Database
            const categories = await Category.find(categoryQuery);
            // Get all categories ids
            const categoryIds = categories.map(x => x._id);
            // Filter out categories by ids
            if(categoryIds.length > 0){
                filters.category = { $in: categoryIds };
            }
        }
        const transactions = await Transaction.find(filters).populate("category").sort({ date: -1 }); // Sort according to Date asc to dsc
        res.json(transactions);
    }),
    // Updating the Transaction details by id
    update: asyncHandler(async(req, res) => {
        // Get the transaction by ID 
        const transaction = await Transaction.findById(req.params.id);
        // Check the transaction belongs to User or not
        if(transaction && String(transaction.user) === String(req.user)){
            // Pick the category if it's needed to be updated
            const category = await Category.findOne({ name: req.body.categoryname.toLowerCase() });
            transaction.category = category || transaction.category;
            transaction.amount = req.body.amount || transaction.amount;
            transaction.date = req.body.date || transaction.date;
            transaction.description = req.body.description || transaction.description;
            const updatedTransaction = await transaction.save();
            res.json(updatedTransaction);
        }
    }),
    // Detele a transaction by id
    delete: asyncHandler(async(req, res) => {
        // Get the transaction by ID 
        const transaction = await Transaction.findById(req.params.id);
        // Check the transaction belongs to User or not
        if(transaction && String(transaction.user) === String(req.user)){
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({
                message: "Transaction Removed",
            })
        }
    })
}

export default transactionController;