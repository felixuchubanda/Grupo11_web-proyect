import { UsuarioService } from '../../services/index.js';

export const createUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioService.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsuarios = async (req, res) => {
    try {
        const { tipo } = req.query;
        const usuarios = await UsuarioService.getAllUsuarios({ tipo });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await UsuarioService.getUsuarioById(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const updatedUsuario = await UsuarioService.updateUsuario(req.params.id, req.body);
        if (updatedUsuario) {
            res.json(updatedUsuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const deleted = await UsuarioService.deleteUsuario(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const usuario = await UsuarioService.loginUsuario(email, contrasena);
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const solicitarRestablecimientoContrasena = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'El correo electrónico es requerido.' });
        }
        await UsuarioService.solicitarRestablecimientoContrasena(email);
        res.json({ message: 'Correo de recuperación enviado.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const restablecerContrasena = async (req, res) => {
    try {
        const { token, nuevaContrasena } = req.body;
        await UsuarioService.restablecerContrasena(token, nuevaContrasena);
        res.json({ message: 'Contraseña actualizada correctamente.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};