import express from 'express';
import isAuthenticated from '../middleware/isAuth.js';
import transactionController from '../controller/transactionCtrl.js';
const transactionRouter = express.Router();

// Routes for transactions
transactionRouter.post('/transaction/add', isAuthenticated, transactionController.add);
transactionRouter.get('/transaction/list', isAuthenticated, transactionController.lists);
transactionRouter.get('/transaction/filter-list', isAuthenticated, transactionController.getFilteredTransactions);
transactionRouter.put('/transaction/update/:id', isAuthenticated, transactionController.update);
transactionRouter.delete('/transaction/delete/:id', isAuthenticated, transactionController.delete);

export default transactionRouter;