import bcrypt from 'bcryptjs';

export class Security{
    public static encodedPassword( rawPassword : string){
        const encodedPassword = bcrypt.hashSync(rawPassword, 10);
    }
    public static  verifyPassword( rawPassword: string, encodedPassword:string){
        return bcrypt.compareSync( rawPassword, encodedPassword);
    }
}