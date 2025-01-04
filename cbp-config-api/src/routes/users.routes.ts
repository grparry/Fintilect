import { Router } from 'express';
import { validateRequest } from '../middleware';
import { UserController } from '../controllers/user.controller';
import { userSchemas } from '../validators/user.validator';

const router = Router();
const controller = new UserController();

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get current user
 *     description: Retrieve the profile of the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/me', controller.getCurrentUser);

/**
 * @openapi
 * /users/me:
 *   put:
 *     summary: Update current user
 *     description: Update the profile of the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User profile updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.put('/me',
  validateRequest(userSchemas.updateUser),
  controller.updateCurrentUser
);

/**
 * @openapi
 * /users/me/preferences:
 *   get:
 *     summary: Get user preferences
 *     description: Retrieve preferences for the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/me/preferences', controller.getUserPreferences);

/**
 * @openapi
 * /users/me/preferences:
 *   put:
 *     summary: Update user preferences
 *     description: Update preferences for the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserPreferences'
 *     responses:
 *       200:
 *         description: User preferences updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.put('/me/preferences',
  validateRequest(userSchemas.updatePreferences),
  controller.updateUserPreferences
);

// Get user's payee options
router.get('/:id/payee-options', controller.getPayeeOptions);

// Update user's payee options
router.put('/:id/payee-options',
  validateRequest(userSchemas.updatePayeeOptions),
  controller.updatePayeeOptions
);

// Get user's host info
router.get('/:id/host-info', controller.getHostInfo);

export { router as usersRouter };
