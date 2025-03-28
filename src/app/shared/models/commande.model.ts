export interface Commande {
  id: number;
  montant: number;
  date: Date;
}

export interface ClientSampleDto {
  firstName : string;
  lastName : string;
  phone : string;
}

export interface ClientWithCommandePaginateDto {
  client : ClientSampleDto;
  commandes : Commande[];
  // currentPage : number;
  // totalPages : number;
  // isFirst : boolean;
  // isLast : boolean;
  // pages : number[];
}
