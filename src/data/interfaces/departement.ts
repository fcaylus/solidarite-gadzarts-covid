export interface Departement {
    code: string;
    name: string;
}

export interface DepartementsHashMap {
    [code: string]: Departement;
}
