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
exports.UserController = void 0;
const UserErros_1 = require("@domain/erros/UserErros");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserDto = req.body;
                const user = yield this.userService.createUser(createUserDto);
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof UserErros_1.EmailInUseError || error instanceof UserErros_1.UsernameInUseError) {
                    res.status(409).json({ message: error.message }); // Conflict
                }
                else if (error instanceof Error && error.message.includes("required")) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    next(error);
                }
            }
        });
    }
}
exports.UserController = UserController;
