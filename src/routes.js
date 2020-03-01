import { Router } from 'express';

import UserController from './app/controllers/userController';
import PizzaController from './app/controllers/pizzaController';
import BebidaController from './app/controllers/bebidaController';
import PedidoController from './app/controllers/pedidoController';
import IngredienteController from './app/controllers/ingredienteController';


const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/pizzas', PizzaController.store);

routes.post('/bebidas', BebidaController.store);

routes.post('/pedidos', PedidoController.store);
routes.post('/ingredientes', IngredienteController.store);

export default routes;