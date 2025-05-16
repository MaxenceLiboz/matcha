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
exports.CreateUserUseCase = void 0;
const User_1 = require("@domain/entities/User");
const UserErros_1 = require("@domain/erros/UserErros");
class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check either the username or email that needs to be unique already exist
            const existingUser = yield this.userRepository.getUserByUsernameOrEmail(data.email, data.username);
            if (existingUser && existingUser.email === data.email) {
                throw new UserErros_1.EmailInUseError(data.email);
            }
            else if (existingUser && existingUser.username === data.username) {
                throw new UserErros_1.UsernameInUseError(data.username);
            }
            let userToSave = User_1.User.create(data.email, data.first_name, data.last_name, data.username);
            // The save method now returns the user with DB-generated id, created_at, updated_at
            const savedUser = yield this.userRepository.save(userToSave);
            // Ensure savedUser has an ID, or throw an error if persistence failed silently (shouldn't happen with good repo)
            if (!savedUser.id || !savedUser.created_at || !savedUser.updated_at) {
                throw new Error('User persistence failed to return generated fields.');
            }
            return {
                // id: savedUser.id,
                email: savedUser.email,
                first_name: savedUser.first_name,
                last_name: savedUser.last_name,
                username: savedUser.username,
                verified: savedUser.verified
            };
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
