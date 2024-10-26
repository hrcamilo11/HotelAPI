const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the location
 *         name:
 *           type: string
 *           description: The name of the location
 *         address:
 *           type: string
 *           description: The address of the location
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the location was added
 */

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Returns the list of all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: The list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Some server error
 */
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('locations')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get a location by id
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The location id
 *     responses:
 *       200:
 *         description: The location description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: The location was not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('locations')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: The location was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.post('/', authMiddleware, async (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: 'Name and address are required' });
    }

    try {
        const { data, error } = await supabase
            .from('locations')
            .insert({ name, address })
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The location id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: The location was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The location was not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ error: 'Name and address are required' });
    }

    try {
        const { data, error } = await supabase
            .from('locations')
            .update({ name, address })
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The location id
 *     responses:
 *       200:
 *         description: The location was deleted
 *              401:
 *         description: Unauthorized
 *       404:
 *         description: The location was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('locations')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }

        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;