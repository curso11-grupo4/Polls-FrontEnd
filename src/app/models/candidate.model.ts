import { Party } from "./party.model";

export class Candidate {
    _id?: string;
    name?: string;
    lastname?: string;
    resolution_number?: string;
    personal_id?: string;
    party?: Party;
}
