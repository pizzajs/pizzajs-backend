import Sequelize from 'sequelize';

import databaseConfig from '../config/database'

import User from '../app/models/user';
import Pizza from '../app/models/pizza';
import Pedido from '../app/models/pedidos';
import Ingrediente from '../app/models/ingrediente';
import Bebida from '../app/models/bebida';

const models = [User, Pizza, Pedido, Ingrediente, Bebida];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        
        models.map(model => model.init(this.connection));
    }
}

export default new Database();