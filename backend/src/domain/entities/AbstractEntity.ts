export abstract class AbstractEntity {
  public readonly id?: number;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(id?: number, created_at?: Date, updated_at?: Date) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
