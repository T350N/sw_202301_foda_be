import { MongoDAOBase } from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { DefaultUser, IUser } from './IUser';
import { ObjectId } from 'mongodb';

export class UserDao extends MongoDAOBase<IUser> {
    constructor(conexion: IDBConnection) {
        super("users", conexion);
    }
    public async create(user: Partial<IUser>) {
        const newUser = { ...DefaultUser, ...user };
        return this.create(newUser);
    }
    public async updateCounter(fodaId: string | ObjectId) {
        let oFodaId = typeof fodaId == 'string' ? new ObjectId(fodaId) : fodaId;
        let filter = { _id: oFodaId };
        let updCmd = { "$inc": { "entradas": 1 }, "$set": { "updatedAt": new Date() } }
        console.log('updateCounter:', { updCmd, oFodaId });
        return super.rawUpdate(filter, updCmd);
    }
}
