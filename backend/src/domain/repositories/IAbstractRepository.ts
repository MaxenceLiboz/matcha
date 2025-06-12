export interface IAbstractRepository<TDomain> {
  getById(id: number): Promise<TDomain | null>;
  getByFields(fields: { [filedName: string]: any }): Promise<TDomain[]>;
}
