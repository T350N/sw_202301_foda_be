export interface IUsuario{// Interface = verificacion de tipos para la compilacion; es estructurar que define un tipo de dato
//codigo, correo, nombre, password, roles [], creado, ultimoAcceso
    codigo:string;  
    correo:string;
    nombre:string;
    password:string;
    roles?:string[];
    created?:Date;
    ultimoAcceso?:Date; // ? significa que la es objetos opcionales; este atributo puede que venga o no en la estructura
}

export class Usuarios{

    private usuarios : IUsuario[];
    constructor(){
        this.usuarios = [];

    }
    getAll(){
        return this.usuarios;
    }
    getById(codigo:string){
        const usuarioToReturn = this.usuarios.find((usr)=>{
            return usr.codigo === codigo;
        });
        return usuarioToReturn;
    }
    add(nuevoUsuario : IUsuario){
        const date = new Date();

        const nuevo : IUsuario = {
            ...nuevoUsuario,
            codigo: (Math.random()*1000).toString()+date.getDate().toString(),
            roles:['ADM'],
            created: date,
            ultimoAcceso:date
        
        }
        this.usuarios.push(nuevo);
        return nuevo;
    }
    update(updateUsuario: IUsuario){
        let updated = false;
        const newUsuarios: IUsuario[] = this.usuarios.map((usr)=>{
            if(usr.codigo === updateUsuario.codigo){
                updated = true;
                return {...usr, ...updateUsuario, update: new Date()};
            }
            return usr;
        });
        this.usuarios = newUsuarios;
        return updated;
        
    }
    delete (codigo: string){
        const usuarioToDelete = this.usuarios.find((usr)=>{
            return usr.codigo === codigo;
        });
        if(usuarioToDelete){
            const newUsuarios: IUsuario[] = this.usuarios.filter((usr)=>{
                return usr.codigo !== codigo;
            });
            this.usuarios = newUsuarios;
            return true;
        }
        return false;
    }
}