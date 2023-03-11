import express from 'express';
import { UserDao } from '@dao/models/Usuario/UserDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { Users } from '@libs/Usuarios/Usuarios';

const usuariosDao = new UserDao(MongoDBConn);
let fodaDao;
let usuariosModel: Users;
let userModel: Users;

usuariosDao.init().then(() => {
    usuariosModel = new Users(usuariosDao);
    fodaDao = new UserDao(MongoDBConn);
    fodaDao.init().then(() => {
        userModel = new Users(fodaDao);
    });
});
const router = express.Router();

router.get('/:user/foda', async (req, res) => {
    const { user } = req.params;
    const users = await userModel.getAllFromUsuario(user);
    return res.status(200).json(users);
});

router.post('/:user/new', async (req, res) => {
    const { user } = req.params as { user: string };
    const { nombre } = req.body;
    const result = await userModel.newUser(nombre, user);
    return res.status(200).json(result);
});

router.put('/:user/tmp/:userId', async (req, res) => {
    const { userId } = req.params;

    const updObject = await userModel.updateUser(userId);
    return res.status(200).json(updObject);
});

router.put('/:user/upd/:fodaId/nombre', async (req, res) => {
    const { fodaId } = req.params;
    const { nombre } = req.body;
    const updObject = await userModel.setNombre(fodaId, nombre);
    return res.status(200).json(updObject);
});
router.put('/:user/upd/:fodaId/estado', async (req, res) => {
    const { fodaId } = req.params;
    const { estado } = req.body;
    const updObject = await userModel.setEstado(fodaId, estado);
    return res.status(200).json(updObject);
});

export default router;
