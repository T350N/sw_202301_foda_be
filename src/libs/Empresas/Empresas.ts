export interface IEmpresa{// Interface = verificacion de tipos para la compilacion; es estructurar que define un tipo de dato
    codigo:string;  
    nombre:string;
    status:string;
    created?:Date;
    updated?:Date;
    observacion?:string; // ? significa que la es objetos opcionales; este atributo puede que venga o no en la estructura
}


export class Empresas{

    private empresas : IEmpresa[];
    constructor(){
        this.empresas = [];

    }
    getAll(){
        return this.empresas;
    }
    getById(codigo:string){
        const empresaToReturn = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });
        return empresaToReturn;
    }
    add(nuevaEmpresa : IEmpresa){
        const date= new Date();
        const nueva : IEmpresa = {
            ...nuevaEmpresa,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            created: date,
            updated: date
        
        }
        this.empresas.push(nueva);
        return true;
    }
    update(updateEmpresa: IEmpresa){
        let updated = false;
        const newEmpresas: IEmpresa[] = this.empresas.map((emp)=>{
            if(emp.codigo === updateEmpresa.codigo){
                updated = true;
                return {...emp, ...updateEmpresa, update: new Date()};
            }
            return emp;
        });
        this.empresas = newEmpresas;
        return updated;
        
    }
    delete (codigo: string){
        const empresaToDelete = this.empresas.find((emp)=>{
            return emp.codigo === codigo;
        });
        if(empresaToDelete){
            const newEmpresas: IEmpresa[] = this.empresas.filter((emp)=>{
                return emp.codigo !== codigo;
            });
            this.empresas = newEmpresas;
            return true;
        }
        return false;
    }
}