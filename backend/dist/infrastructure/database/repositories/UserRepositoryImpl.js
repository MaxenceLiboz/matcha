"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserMapper_1 = require("../mappers/UserMapper");
class UserRepository {
    constructor(db) {
        this.db = db;
    }
    
    getUserByUsernameOrEmail(username, email) {
        throw new Error('Method not implemented.');
    }

    save(user, password_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.id) { // Update if user already exist
                const updateData = UserMapper_1.UserMapper.toPersistenceUpdate(user);
                const updatedRecord = yield this.db
                    .updateTable('User')
                    .set(updateData)
                    .where('id', '=', user.id)
                    .returningAll()
                    .executeTakeFirstOrThrow();
                return UserMapper_1.UserMapper.toDomain(updatedRecord);
            }
            else { // Insert otherwise
                if (!password_hash) {
                    throw new Error("Password hash is undefined while inserting a new user.");
                }
                const insertData = UserMapper_1.UserMapper.toPersistenceInsert(user, password_hash);
                const insertedRecord = yield this.db
                    .insertInto('User')
                    .values(insertData)
                    .returningAll()
                    .executeTakeFirstOrThrow();
                return UserMapper_1.UserMapper.toDomain(insertedRecord);
            }
        });
    }
}
exports.UserRepository = UserRepository;
