import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { UserDao } from "@dao/models/Usuario/UserDao";
import { Security } from "@utils/security";
import { JWT } from "@server/utils/Jwt";
import { IUser, EUserState } from "@server/dao/models/Usuario/IUser";
import { type } from "os";



export class Users {
    private userDao: UserDao;
    constructor(user: IDataAccessObject) {
        this.userDao = user as UserDao;
    }
    public async newUser(email: string, password: string) {
        try {
            const newUser = {
                email,
                password: Security.encodedPassword(password),
                pswExpires: new Date(new Date().getTime() + (3 * 30 * 24 * 60 * 60 * 1000)),
            };
            const result = await this.userDao.create(newUser);
            const rt = await this.userDao.findOneByFilter({ _id: result?.insertedId });
            delete rt.password;
            return rt;
        } catch (ex) {
            console.error('newUser Error:', ex);
            return null;
        }
    }
    public async updateUser(_id: string) {
        const result = await (this.userDao as UserDao).updateCounter(_id);
        console.log('updateFoda:', result);
        const rt = await this.userDao.findByID(_id);
        return rt;
    }
    public async loginUser(email: string, password: string) {
        try {
            const dbUser = await this.userDao.findOneByFilter(
                { email },
                { projection: { _id: 1, email: 1, password: 1, state: 1, roles: 1, pswExpires: 1, avatar: 1 } }
            );
            if (Security.verifyPassword(password, dbUser.password)) {
                delete dbUser.password;
                delete dbUser.pswExpires;
                delete dbUser.state;

                //JWT
                const token = JWT.signJWT(dbUser);
                return token;

            }
        } catch (err) {
            console.error(err);
            throw new Error("can´t Validate");
            return null;

        }
    }
    private async setUpdates(_id, updateCmd: Partial<IUser>) {
        await this.userDao.update(_id, { ...updateCmd, updatedAt: new Date() });
        const updatedUser = await this.userDao.findByID(_id);
        return updatedUser;
    }
    public setObservation(_id: string,) {
        return this.setUpdates(_id, {});
    }
    public setEstado(_id: string, state: EUserState) {
        return this.setUpdates(_id, { state });
    }
    public getAllFromUsuario(_id: string) {
        return this.userDao.findByFilter({ "usuarios.id": this.userDao.getIDFromString(_id) });
    }
    public setNombre(user_id: string, email: string) {
        return this.setUpdates(user_id, { email: email });
    }

}