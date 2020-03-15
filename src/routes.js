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

//rotas usuarios
routes.put('/users', UserController.update);
routes.get('/users', UserController.index);
//rotas pedidos
routes.post('/pedidos', PedidoController.store);
routes.put('/pedidos/:id', PedidoController.update);
routes.get('/pedidos/:id',PedidoController.index)
routes.get('/pedidos',PedidoController.index)

// rotas pizza
routes.post('/pizzas/', PizzaController.store);
routes.put('/pizzas/:pedidoId/:pizzaId', PizzaController.update);
routes.get('/pizzas', PizzaController.index);

//rotsas bebidas
routes.post('/bebidas', BebidaController.store);
routes.put('/bebidas/:id', BebidaController.update);
routes.get('/bebidas', BebidaController.index);

//rotsas ingredientes
routes.post('/ingredientes', IngredienteController.store);
routes.put('/ingredientes/:id', IngredienteController.update);
routes.get('/ingredientes', IngredienteController.index);




export default routes;

// PUT, POST, DELETE, GET