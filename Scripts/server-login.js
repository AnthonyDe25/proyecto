const fs = require('fs');  // Módulo para leer y escribir archivos
const express = require('express');  // Framework para construir el servidor
const bodyParser = require('body-parser');  // Middleware para procesar datos JSON

const app = express();
const PORT = 3000;  // Puerto donde correrá el servidor

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Verifica que los datos sean válidos
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos.' });
    }

    // Leer el archivo JSON de usuarios
    let users = {};
    try {
        users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (err) {
        console.error('Error leyendo el archivo JSON:', err);
    }

    // Verifica si el usuario ya está registrado
    if (users[email]) {
        return res.status(400).json({ message: 'Usuario ya registrado.' });
    }

    // Agregar el nuevo usuario
    users[email] = { name, password };

    // Guardar los cambios en el archivo JSON
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        return res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (err) {
        console.error('Error escribiendo en el archivo JSON:', err);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Leer el archivo JSON de usuarios
    let users = {};
    try {
        users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
    } catch (err) {
        console.error('Error leyendo el archivo JSON:', err);
    }

    // Verifica si el usuario existe y la contraseña es correcta
    const user = users[email];
    if (user && user.password === password) {
        return res.status(200).json({ message: `Bienvenido de nuevo, ${user.name}!` });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas o usuario no registrado.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});