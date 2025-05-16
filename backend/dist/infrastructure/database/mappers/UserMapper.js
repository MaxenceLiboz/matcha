"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("@domain/entities/User");
class UserMapper {
    // From DB record (Kysely result) to Domain Entity
    static toDomain(db_record) {
        return User_1.User.hydrate(db_record.id, db_record.email, db_record.first_name, db_record.last_name, db_record.username, db_record.verified === 1, db_record.created_at, db_record.updated_at);
    }
    static toPersistenceInsert(domainUser, password_hash) {
        return {
            email: domainUser.email,
            first_name: domainUser.first_name,
            last_name: domainUser.last_name,
            username: domainUser.username,
            password_hash: password_hash,
            verified: 0
        };
    }
    static toPersistenceUpdate(domainUser, password_hash) {
        if (password_hash) {
            return {
                email: domainUser.email,
                first_name: domainUser.first_name,
                last_name: domainUser.last_name,
                username: domainUser.username,
                password_hash: password_hash,
            };
        }
        else {
            return {
                email: domainUser.email,
                first_name: domainUser.first_name,
                last_name: domainUser.last_name,
                username: domainUser.username
            };
        }
    }
}
exports.UserMapper = UserMapper;
