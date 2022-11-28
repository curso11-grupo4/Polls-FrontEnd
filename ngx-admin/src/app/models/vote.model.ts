import { Candidate } from "./candidate.model";
import { Table } from "./table.model";

export class Vote {
    _id?: string;
    vote?: number; 
    candidate?: Candidate;
    table?: Table;

}
