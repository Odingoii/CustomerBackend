const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user using email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: string
 *                 example: "test@example.com"
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: User's password
 *               firstName:
 *                 type: string
 *                 example: "John"
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *                 description: Last name of the user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation or registration error
 */
router.post('/register', authController.registerWithEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.loginWithEmail);

/**
 * @swagger
 * /auth/register/google:
 *   post:
 *     summary: Register or login using Google SSO
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Google OAuth ID token
 *     responses:
 *       201:
 *         description: User registered or logged in successfully
 *       400:
 *         description: Error during Google SSO
 */
router.post('/register/google', authController.registerWithGoogle);

/**
 * @swagger
 * /auth/register/facebook:
 *   post:
 *     summary: Register or login using Facebook SSO
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 example: "EAAJZC7bAZBrBcBAJ..."
 *                 description: Facebook OAuth access token
 *     responses:
 *       201:
 *         description: User registered or logged in successfully
 *       400:
 *         description: Error during Facebook SSO
 */
router.post('/register/facebook', authController.registerWithFacebook);

/**
 * @swagger
 * /auth/register/apple:
 *   post:
 *     summary: Register or login using Apple SSO
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identityToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Apple OAuth identity token
 *     responses:
 *       201:
 *         description: User registered or logged in successfully
 *       400:
 *         description: Error during Apple SSO
 */
router.post('/register/apple', authController.registerWithApple);

module.exports = router;
