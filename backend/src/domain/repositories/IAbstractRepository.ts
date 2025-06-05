// src/domain/repositories/iabstract.repository.ts
export interface IAbstractRepository<TDomain> {
    getById(id: number): Promise<TDomain | null>;
    getByFields(fields: {[filedName: string]: any}): Promise<TDomain[]>;
    // You can add other common methods here:
    // getAll?(): Promise<TDomain[]>;
    // create?(data: Partial<TDomain>): Promise<TDomain>;
    // update?(id: number, data: Partial<TDomain>): Promise<TDomain | null>;
    // delete?(id: number): Promise<boolean>;
}