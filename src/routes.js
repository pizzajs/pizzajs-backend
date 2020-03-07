import { Router } from 'express';

import UserController from './app/controllers/userController';
import PizzaController from './app/controllers/pizzaController';
import BebidaController from './app/controllers/bebidaController';
import PedidoController from './app/controllers/pedidoController';
import IngredienteController from './app/controllers/ingredienteController';
import SessionController from './app/controllers/sessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store );

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/pedidos', PedidoController.store);
routes.put('/pedidos/:id', PedidoController.update);

routes.post('/pizzas', PizzaController.store);

routes.post('/bebidas', BebidaController.store);

routes.post('/ingredientes', IngredienteController.store);


export default routes;

// PUT, POST, DELETE, GET