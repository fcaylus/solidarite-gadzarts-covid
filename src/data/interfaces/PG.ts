export interface PG {
    prenom: string;
    nom: string;
    departements: string[];
    ville: string;
    tbk: string;
    proms: string;
    telephone: string;
    email: string;
}

export interface PGHashMap {
    [departement: string]: PG[];
}
