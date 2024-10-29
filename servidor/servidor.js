const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos SQLite usando Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
});

// Definir el modelo de Producto
const Gasto = sequelize.define('Gasto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoría: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false  
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'gastos',
});

const Ingreso = sequelize.define('Ingreso', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
   },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false  
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'ingresos',
});

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  correo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
});

Usuario.hasMany(Gasto, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Usuario.hasMany(Ingreso, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Gasto.belongsTo(Usuario);
Ingreso.belongsTo(Usuario);

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Usar CORS
app.use(cors()); // Habilita CORS para todas las rutas

// Rutas de la API

// Obtener todos los ingresos de un usuario
app.get('/api/ingresos/:userId', async (req, res) => {
  try {
    const ingresos = await Ingreso.findAll({
        where: {
            userId: req.params.userId
        }    
    });
    res.json(ingresos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los ingresos' });
  }
});

//Obtener todos los gastos de un usuario
app.get('/api/gastos/:userId', async (req, res) => {
  try {
    const gastos = await Gasto.findAll({
        where: {
            userId: req.params.userId
        }    
    });
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
});

// Crear un nuevo ingreso
app.post('/api/ingresos', async (req, res) => {
  try {
    const nuevoIngreso = await Ingreso.create(req.body);
    res.status(201).json(nuevoIngreso);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el ingreso' });
  }
});

//Crear un nuevo gasto
app.post('/api/gastos', async (req, res) => {
  try {
    const nuevoGasto = await Gasto.create(req.body);
    res.status(201).json(nuevoGasto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el gasto' });
  }
});

// Actualizar un ingreso por ID
app.put('/api/ingresos/:id', async (req, res) => {
  try {
    const ingreso = await Ingreso.findByPk(req.params.id);
    if (!ingreso) {
      return res.status(404).json({ error: 'Ingreso no encontrado' });
    }
    await ingreso.update(req.body);
    res.json(ingreso);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ingreso' });
  }
});

//Actualizar un gasto por ID
app.put('/api/gastos/:id', async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }
    await gasto.update(req.body);
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el gasto' });
  }
});

// Eliminar un ingreso por ID
app.delete('/api/ingresos/:id', async (req, res) => {
  try {
    const ingreso = await Ingreso.findByPk(req.params.id);
    if (!ingreso) {
      return res.status(404).json({ error: 'Ingreso no encontrado' });
    }
    await ingreso.destroy();
    res.json({ message: 'Ingreso eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ingreso' });
  }
});

//Eliminar un gasto por ID
app.delete('/api/gastos/:id', async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }
    await gasto.destroy();
    res.json({ message: 'Gasto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el gasto' });
  }
});

app.get('/api/usuarios/:username/:password', async (req, res) => {
  try {
    const gastos = await Usuario.findAll({
        where: {
          username: req.params.username,
          contrasena: req.params.password
        }    
    });
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
});

app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el usuario' });
  }
});

// Sincronizar la base de datos y lanzar el servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos y tablas sincronizadas');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});
