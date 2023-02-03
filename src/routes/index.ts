import express from 'express';
const router  = express.Router();


import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';
//{}
//[]
//{ llave : valor }
//Valor: Texto, numerico. Booleano, array [valores], objeto{llave:valor}
//CRUD  

// http://localhost:3001 
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
});

router.get('/version',(_req, res)=>{ //se precede de _ para que no tenga que salir que no se esta usando
  const version : string = "1.0,0";
  const jsonResp = {"name":"FODA Be", "version": version};
  //string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
});

router.use('/empresas', empresasRouter);
router.use('/usuarios', usuariosRouter);

//router.get
//router.post
//router.put
//router.delete
//router.use (para establecer rutas)

export default router;
