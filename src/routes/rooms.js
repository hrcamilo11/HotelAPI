const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - number
 *         - type
 *         - price
 *         - location_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the room
 *         number:
 *           type: string
 *           description: The room number
 *         type:
 *           type: string
 *           description: The type of room (e.g., single, double, suite)
 *         price:
 *           type: number
 *           description: The price per night
 *         location_id:
 *           type: string
 *           description: The id of the location where the room is
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the room was added
 */

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Returns the list of all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: The list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rooms')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by id
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *     responses:
 *       200:
 *         description: The room description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: The room was not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.post('/', authMiddleware, async (req, res) => {
    const { number, type, price, location_id } = req.body;

    if (!number || !type || !price || !location_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { data, error } = await supabase
            .from('rooms')
            .insert({ number, type, price, location_id })
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: The room was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The room was not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', authMiddleware, async (req, res) => {
    const { number, type, price, location_id } = req.body;

    if (!number || !type || !price || !location_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { data, error } = await supabase
            .from('rooms')
            .update({ number, type, price, location_id })
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The room id
 *     responses:
 *       200:
 *         description: The room was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The room was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('rooms')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;