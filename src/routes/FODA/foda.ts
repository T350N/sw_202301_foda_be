import express from 'express';
import { Foda } from '@server/libs/FODA/Foda';
const router = express.Router();

let fodaModel:Foda;
//empresasDao;

router.post('/new', async(req,res)=>{
    const {empresa}= req.params as {empresa:string};
    const {nombre} = req.body;
    const result = await fodaModel.newFoda(nombre, empresa);
    return res.status(200).json(result);

});

router.put('/:empresa/tmp/:fodaId', async (req,res)=>{
    const {fodaId} = req.params;
    const {type} = req.body;
    const updt = await fodaModel.updateFoda(fodaId,type);
    return res.status(200).json(updt);
});
export default router;
