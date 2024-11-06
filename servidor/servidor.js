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

//Esturctura de la BD
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
  categoriaId: {
    type: DataTypes.INTEGER,
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
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
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

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  transaccion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'categorias'
});

const Presupuesto = sequelize.define('Presupuesto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cantidad: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'presupuestos'
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
Usuario.hasMany(Categoria, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Usuario.hasMany(Presupuesto, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Categoria.hasMany(Gasto, {
  foreignKey: 'categoriaId',
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

Categoria.hasMany(Ingreso, {
  foreignKey: "categoriaId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
Presupuesto.belongsTo(Categoria, { foreignKey: "categoriaId" });

Ingreso.belongsTo(Categoria, { foreignKey: "categoriaId" });
Gasto.belongsTo(Categoria, { foreignKey: "categoriaId" });

Gasto.belongsTo(Usuario, { foreignKey: "userId" });
Ingreso.belongsTo(Usuario, { foreignKey: "userId" });
Categoria.belongsTo(Usuario, { foreignKey: "userId" })
Presupuesto.belongsTo(Usuario, { foreignKey: "userId" });

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
    res.status(500).json({ error: 'Error al agregar el ingreso' + error });
  }
});

//Crear un nuevo gasto
app.post('/api/gastos', async (req, res) => {
  try {
    const nuevoGasto = await Gasto.create(req.body);
    res.status(201).json(nuevoGasto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el gasto'});
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

//Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length == 0) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }
    res.json(usuarios);
  } catch(error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
})

//Obtener usuario por username y contraseña
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

//Crear un usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el usuario' });
  }
});

// Ruta para obtener datos de gastos según el tipo de consulta solicitado
app.get('/api/gastos/consulta/:queryType/:userId', async (req, res) => {
  const { queryType, userId } = req.params;

  try {
    let result;

    if (queryType === 'total') {
      // Suma total de todos los gastos del usuario
      result = await Gasto.sum('cantidad', { where: { userId } });

    } else if (queryType === 'porCategoria') {
      // Suma de gastos agrupada por categoría
      result = await Gasto.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId']
      });

    } else if (queryType === 'porMes') {
      // Suma de gastos agrupada por categoría y por mes
      result = await Gasto.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('strftime', '%Y-%m', sequelize.col('fecha')), 'mes'],
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId', 'mes']
      });

    } else if (queryType === 'porDia') {
      // Suma de gastos agrupada por categoría y por día
      result = await Gasto.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('strftime', '%Y-%m-%d', sequelize.col('fecha')), 'dia'],
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId', 'dia']
      });

    } else if (queryType === 'porAno') {
      // Suma de gastos agrupada por categoría y por año
      result = await Gasto.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('strftime', '%Y', sequelize.col('fecha')), 'ano'],
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId', 'ano']
      });

    } else {
      return res.status(400).json({ error: 'Tipo de consulta no válido' });
    }

    res.json(result);

  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({ error: 'Error al realizar la consulta' });
  }
});

// Ruta para obtener datos de ingresos según el tipo de consulta solicitado
app.get('/api/ingresos/consulta/:queryType/:userId', async (req, res) => {
  const { queryType, userId } = req.params;

  try {
    let result;

    if (queryType === 'total') {
      // Suma total de todos los ingresos del usuario
      result = await Ingreso.sum('cantidad', { where: { userId } });

    } else if (queryType === 'porCategoria') {
      // Suma de ingresos agrupada por categoría
      result = await Ingreso.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId']
      });

    } else if (queryType === 'porMes') {
      // Suma de ingresos agrupada por categoría y por mes
      result = await Ingreso.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('strftime', '%Y-%m', sequelize.col('fecha')), 'mes'],
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId', 'mes']
      });

    } else if (queryType === 'porDia') {
      // Suma de ingresos agrupada por categoría y por día
      result = await Ingreso.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('strftime', '%Y-%m-%d', sequelize.col('fecha')), 'dia'],
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId', 'dia']
      });

    } else if (queryType === 'porAno') {
      // Suma de ingresos agrupada por categoría y por año
      result = await Ingreso.findAll({
        attributes: [
          'categoriaId',
          [sequelize.fn('strftime', '%Y', sequelize.col('fecha')), 'ano'],
          [sequelize.fn('SUM', sequelize.col('cantidad')), 'total']
        ],
        where: { userId },
        group: ['categoriaId', 'ano']
      });

    } else {
      return res.status(400).json({ error: 'Tipo de consulta no válido' });
    }

    res.json(result);

  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({ error: 'Error al realizar la consulta' });
  }
});

//Obtener categorías por ID del usuario
app.get('/api/categorias/:userId', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (categorias.length == 0) {
      return res.status(404).json({ error: "No se encontraron categorías" })
    }
    return res.json(categorias)
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las categorías" })
  }
});

//Obtener categorías de gastos o ingresos usando tipo de transaccion (Gasto o  Ingreso) y ID del usuario
app.get('/api/categorias/:tipoTransaccion/:userId', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: {
        transaccion:req.params.tipoTransaccion,
        userId: req.params.userId
      }
    })
    if (categorias.length == 0) {
      return res.status(404).json({ error: "No se encontraron categorías" })
    }
    return res.json(categorias)
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las categorías" })
  }
});

//Crear una categoría
app.post('/api/categorias', async (req, res) => {
  try {
    const nuevaCategoria = await Categoria.create(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la categoría' });
  }
});

//Actualizar una categoría
app.put('/api/categorias/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
});

//Borrar una categoría
app.delete('/api/categorias/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await categoria.destroy();
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoria' + error});
  }
});

//Obtener presupuestos por ID de usuario
app.get('/api/presupuestos/:userId', async (req, res) => {
  try {
    const presupuestos = await Presupuesto.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (presupuestos.length == 0) {
      return res.status(404).json({ error: "No se encontraron presupuestos" })
    }
    return res.json(presupuestos)
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los presupuestos" })
  }
});

app.get('/api/presupuestos/:userId/:id', async (req, res) => {
  try {
    const presupuestos = await Presupuesto.findAll({
      where: {
        id: req.params.id,
        userId: req.params.userId
      }
    })
    if (presupuestos.length == 0) {
      return res.status(404).json({ error: "No se encontraron presupuestos" })
    }
    return res.json(presupuestos)
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los presupuestos" })
  }
});

//Crear un presupuesto
app.post('/api/presupuestos', async (req, res) => {
  try {
    const nuevoPresupuesto = await Presupuesto.create(req.body);
    res.status(201).json(nuevoPresupuesto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el presupuesto' });
  }
});

//Actualizar un presupuesto
app.put('/api/presupuestos/:id', async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findByPk(req.params.id);
    if (!presupuesto) {
      return res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
    await presupuesto.update(req.body);
    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el presupuesto' });
  }
});

//Borrar un presupuesto
app.delete('/api/presupuestos/:userId/:id', async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findByPk(req.params.id);
    if (!presupuesto) {
      return res.status(404).json({ error: 'Presupuesto no encontrado' });
    }
    await presupuesto.destroy();
    res.json({ message: 'Presupuesto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el presupuesto' });
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
