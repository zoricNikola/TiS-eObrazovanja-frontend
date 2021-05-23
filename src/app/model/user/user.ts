import { Authority } from "./authority";
import { Institution } from './../institution';

export interface User {
    id?: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phoneNumber: string,
    institution?: Institution,
    authorities?: Authority[]
}