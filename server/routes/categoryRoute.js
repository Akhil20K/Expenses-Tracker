import express from 'express';
import isAuthenticated from '../middleware/isAuth.js';
import categoryController from '../controller/categoryCtrl.js';
const categoryRouter = express.Router();

// Routes for category
categoryRouter.post('/category/add', isAuthenticated, categoryController.add);
categoryRouter.get('/category/list', isAuthenticated, categoryController.lists);
categoryRouter.put('/category/update/:id', isAuthenticated, categoryController.update);
categoryRouter.delete('/category/delete/:id', isAuthenticated, categoryController.delete);

export default categoryRouter;