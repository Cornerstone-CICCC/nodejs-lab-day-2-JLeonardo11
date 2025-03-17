"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controller_1 = __importDefault(require("../controllers/page.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
pageRouter.get('/', page_controller_1.default.home);
pageRouter.get('/about', page_controller_1.default.about);
pageRouter.get('/contact', page_controller_1.default.contact);
pageRouter.get('/signup', auth_middleware_1.checkLoggedOut, page_controller_1.default.signup);
pageRouter.get('/login', auth_middleware_1.checkLoggedOut, page_controller_1.default.login);
exports.default = pageRouter;
