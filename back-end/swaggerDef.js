/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Project'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *       - apiKey: []
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */

// Add similar Swagger annotations for your other routes (post, put, delete)

/**
 * @swagger
 * securityDefinitions:
 *   apiKey:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

/**
 * @swagger
 * basePath: /api
 * info:
 *   title: Your API Title
 *   version: 1.0.0
 *   description: Your API Description
 */

// Add other Swagger JSDoc configurations as needed
