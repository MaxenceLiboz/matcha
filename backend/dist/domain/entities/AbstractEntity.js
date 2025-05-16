"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEntity = void 0;
class AbstractEntity {
    constructor(id, created_at, updated_at) {
        // These are primarily for when hydrating an entity from the database
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
exports.AbstractEntity = AbstractEntity;
