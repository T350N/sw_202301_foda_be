//maneja las rutas de los usuarios
import express from 'express';
const router = express.Router();

import { Usuarios, IUsuario}from '@libs/Usuarios/Usuarios'

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    correo:'cesarH@gmail.com',
    nombre: 'Cherrera',
    password:'',
    
});
//registrar endpoint en routers
//exportar objeto router
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll":{"method":"get", "url": "usuarios/all"},
        "getById":{"method":"get","url": "usuarios/byid/:id"},
        "new":{"method":"post","url": "usuarios/new"},
        "update":{"method":"put","url": "usuarios/upd/:id"},
        "delete":{"method":"delete","url": "usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req,res)=>{
    res.status(200).json(usuariosModel.getAll());
}); 
router.get('/byid/:id',(req,res)=>{
    const {id: codigo} = req.params;
    const usuario = usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"no se encontro usuario"});
});
router.post('/new', (req, res)=>{
    
    console.log("Usuarios /new request Dody:", req.body);
    const {
        correo="Vicentef@gmail.com",
        nombre="Vicente fernandez", 
        password="123456789"
    } = req.body;
    //TODO: Validar entrada de datos
    const newUsuario: IUsuario = {
        codigo: "",
        correo,
        nombre,
        password,

        
    };
    if (usuariosModel.add(newUsuario)){
        return res.status(200).json({"Created":true});
    }
    return res.status(404).json(
        {"error":"Error al agregar nuevo usuario"}
    );

});
router.put('/upd/:id', (req, res)=>{
    const { id } = req.params;
    const {
        correo="---NotReceived---",
        nombre="---NotReceived---", 
        

    } = req.body;

    if(
        correo === "---NotReceived---"
    ){
        return res.status(403).json({"error":"Debe ingresar los datos"});
    }

    const UpdateUsuario : IUsuario = {
        codigo: id,
        correo: '',
        nombre,
        password: ''
    };
    if(usuariosModel.update(UpdateUsuario)){
        res.status(200).json({"Updated":true});
    }
    return res
    .status(404)
    .json({
        "error":"Error al actualizar los datos"
    }
    );

});
router.delete('/del/:id', (req, res)=>{
    const {id : codigo} = req.params;
    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"Deleted":true});
    }
    return res.status(404).json({"error":"no se puedo eliminar usuario"});
});

/*
router.get('/', function(_req, res)){

});
*/
export default router;