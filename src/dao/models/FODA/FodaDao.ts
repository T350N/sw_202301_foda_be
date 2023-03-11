import {MongoDAOBase} from "@dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { DefaultFoda, IFoda } from "./IFoda";
import { IDataAccessObject } from "@dao/IDataAccessObject";
import { ObjectId } from "mongodb";

export class FodaDao extends MongoDAOBase<IFoda>{
    private empresaDao: IDataAccessObject;
    constructor(conexion: IDBConnection, empresaDao: IDataAccessObject){
        super("foda",conexion);
        this.empresaDao = empresaDao;
    }
    public async create(foda:IFoda){
        const{empresa: { id } } = foda;
        if(ObjectId.isValid(id)){
            throw Error("Empresa Object Id not valid")            
        }
        const {_id, nombre} = await this.empresaDao.findByID(id.toString());
        const newFoda = {
            ...DefaultFoda,
        ...foda,
        ...{empresa:{id:_id, nombre}},
        ...{ createdAt: new Date (), updatedAt:new Date()}
        };
        return super.create(newFoda);
    }
    public async updateCounter( fodaId:string|ObjectId, type: 'F'|'D'|'A'|'O'){
        let ofodaId = typeof fodaId == 'string' ? new ObjectId(fodaId):fodaId;//typeof: devuelve en texto el tipo de datos
        let filter = {__id: ofodaId};
        let updtCmd = {"$inc":{"entradas": 1}, "$set":{"updatedAt": new Date()}}
        updtCmd["$inc"][`${type}cantidad`]=1;
        console.log('updateCounter:', {updtCmd, ofodaId});
        return super.rawUpdate(filter,updtCmd);

    }
}
