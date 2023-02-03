//maneja las rutas de las empresas
import express from 'express';
const router = express.Router();

import { Empresas, IEmpresa }from '@libs/Empresas/Empresas';

const empresasModel = new Empresas();

empresasModel.add({
    codigo: '',
    nombre: 'Mi empresa',
    status: 'Activo'
});
//registrar endpoint en routers
//exportar objeto router
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll":{"method":"get", "url": "empresas/all"},
        "getById":{"method":"get","url": "empresas/byid/:id"},
        "new":{"method":"post","url": "empresas/new"},
        "update":{"method":"put","url": "empresas/upd/:id"},
        "delete":{"method":"delete","url": "empresas/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req,res)=>{
    res.status(200).json(empresasModel.getAll());
}); 
router.get('/byid/:id',(req,res)=>{
    const {id: codigo} = req.params;
    const empresa = empresasModel.getById(codigo);
    if(empresa){
        return res.status(200).json(empresa);
    }
    return res.status(404).json({"error":"no se encontro empresa"});
});
router.post('/new', (req, res)=>{
    
    console.log("Empresas /new request Dody:", req.body);
    const {
        nombre="John Doe Corp", 
        status="Activo"
    } = req.body;
    //TODO: Validar entrada de datos
    const newEmpresa: IEmpresa = {
        codigo: "",
        nombre,
        status
    };
    if (empresasModel.add(newEmpresa)){
        return res.status(200).json({"Created":true});
    }
    return res.status(404).json(
        {"error":"Error al agregar nueva empresa"}
    );

});
router.put('/upd/:id', (req, res)=>{
    const { id } = req.params;
    const {
        nombre="John Doe Corp", 
        status="Activo", 
        observacion=""
    } = req.body;

    const UpdateEmpresa : IEmpresa = {
        codigo : id,
        nombre,
        status,
        observacion
    };
    if(empresasModel.update(UpdateEmpresa)){
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
    if(empresasModel.delete(codigo)){
        return res.status(200).json({"Deleted":true});
    }
    return res.status(404).json({"error":"no se puedo eliminar empresa"});
});

/*
router.get('/', function(_req, res)){

});
*/
export default router;