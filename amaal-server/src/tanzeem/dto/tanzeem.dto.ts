import exp from "constants";

export enum Audha {
  MAULIM = 'MAULIM',
  USTAAD = 'USTAAD',
  NAQEEB = 'NAQEEB',
  STUDENT = 'STUDENT',
}

export enum RehbarType {
  DIRECT = 'DIRECT',
  DOTTED = 'DOTTED',
}
export enum RelationType{
  DIRECT = 'DIRECT',
  DOTTED = 'DOTTED',
  ALL = 'ALL'
}

export class Momin {
  audha: Audha;
  id?: string;
  firstName: string;
  lastName: string;
  initials?: string;
}

export class Rehbar {
  rehbarId: string;
  rehbeerId: string;
  rehbarType?: RehbarType;
}
