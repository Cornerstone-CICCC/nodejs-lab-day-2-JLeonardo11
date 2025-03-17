"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.post('/', user_controller_1.default.getUsers);
userRouter.get('/', user_controller_1.default.getUsers); // GET /users
userRouter.get('/:id', user_controller_1.default.getUserById); // GET /users/:id
userRouter.post('/login', user_controller_1.default.loginUser); // POST /users/login
userRouter.post('/', user_controller_1.default.addUser); // POST /users
exports.default = userRouter;
