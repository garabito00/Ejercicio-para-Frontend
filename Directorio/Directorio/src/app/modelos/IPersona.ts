import { IContacto } from "./IContacto";

export interface IPersona{
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    contactos: IContacto[];
}