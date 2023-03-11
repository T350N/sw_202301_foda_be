import express from 'express';
const router  = express.Router();
import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
import { validateJwtMiddleWare } from './middlewares/jwtTokenValidator';

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';
import fodaRouter from './FODA/foda';

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

import securityRoutes from './security/security'
// Aplicar Middlewares
router.use('security',securityRoutes);
//import empresasRouter from './empresas/empresas';
router.use('/empresas', validateKeyMiddleWare, validateJwtMiddleWare, empresasRouter);

//import fodaRouter from './foda/foda';
//router.use ('/foda/:empresa', fodaRouter);
router.use('/foda', validateKeyMiddleWare, validateJwtMiddleWare, fodaRouter);

router.use('/usuarios',validateKeyMiddleWare, validateJwtMiddleWare, usuariosRouter);

//router.get
//router.post
//router.put
//router.delete
//router.use (para establecer rutas)




export default router;
