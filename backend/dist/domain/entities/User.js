"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const AbstractEntity_1 = require("@domain/entities/AbstractEntity");
class User extends AbstractEntity_1.AbstractEntity {
    // Private constructor to enforce factory method usage for creation/hydration
    constructor(email, first_name, last_name, username, verified, id, created_at, updated_at) {
        super(id, created_at, updated_at);
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.verified = verified || false;
    }
    // Factory for creating a NEW user instance (before DB persistence)
    static create(email, first_name, last_name, username, verified) {
        if (!email || !first_name || !last_name || !username) {
            throw new Error(`Everything is required [email: ${email}, first_name: ${first_name}, last_name: ${last_name}, username: ${username}]`);
        }
        // id, created_at, updated_at are created by the DB
        return new User(email, first_name, last_name, username, verified);
    }
    // Factory for hydrating a db user instance
    static hydrate(id, email, first_name, last_name, username, verified, created_at, updated_at) {
        return new User(email, first_name, last_name, username, verified, id, created_at, updated_at);
    }
}
exports.User = User;
