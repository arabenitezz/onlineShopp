const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const router = express.Router();


const JWT_SECRET = 'mi_secreto_super_seguro';

// Registro de un nuevo admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  
  // Verificar si el username ya está registrado
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
  }

  try {
    // Crear un nuevo admin
    const newAdmin = new Admin({ username, password }); 
    await newAdmin.save();
    res.status(201).json({ message: 'Administrador registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar administrador', error });
  }
});

// Renderizar la página de inicio de sesión
router.get('/login', (req, res) => {   
  res.render('login', { title: 'Login' }); 
});  

// Login de admin 
router.post('/login', async (req, res) => {   
  const { username, password } = req.body;    

  if (!username || !password) {     
    return res.status(400).render('login', {       
      title: 'Login',       
      error: 'Todos los campos son obligatorios',     
    });   
  }    

  try {     
    // Buscar el admin por username     
    const admin = await Admin.findOne({ username });     
    if (!admin) {       
      return res.status(401).render('login', {         
        title: 'Login',         
        error: 'Credenciales inválidas',       
      });     
    }      

    // Verificar la contraseña     
    const isMatch = await bcrypt.compare(password, admin.password);     
    if (!isMatch) {       
      return res.status(401).render('login', {         
        title: 'Login',         
        error: 'Credenciales inválidas',       
      });     
    }      

    // Generar el token JWT     
    const token = jwt.sign(
      { id: admin._id, username: admin.username }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );      

    res.redirect(`http://localhost:3000/products/dashboard?token=${token}`) 

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al logear');
}})


module.exports = router;

