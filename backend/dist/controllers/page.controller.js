"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Displays the home page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send home page text.
 */
const home = (req, res) => {
    res.status(200).send("Home page");
};
/**
 * Displays the about page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send about page text.
 */
const about = (req, res) => {
    res.status(200).send("About page");
};
/**
 * Displays the contact page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send contact page text.
 */
const contact = (req, res) => {
    res.status(200).send("Contact page");
};
/**
 * Displays the sign up page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the sign up page.
 */
const signup = (req, res) => {
    res.status(200).render('signup');
};
/**
 * Displays the login page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the login page.
 */
const login = (req, res) => {
    res.status(200).render('login');
};
exports.default = {
    home,
    about,
    contact,
    signup,
    login
};
