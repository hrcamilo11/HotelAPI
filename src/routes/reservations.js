const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - user_id
 *         - room_id
 *         - check_in
 *         - check_out
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the reservation
 *         user_id:
 *           type: string
 *           description: The id of the user making the reservation
 *         room_id:
 *           type: string
 *           description: The id of the room being reserved
 *         check_in:
 *           type: string
 *           format: date
 *           description: The check-in date
 *         check_out:
 *           type: string
 *           format: date
 *           description: The check-out date
 *         created_at:
 *           type: string
 *           format: date
 *           description: The date the reservation was made
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management
 */

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Returns the list of all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get a reservation by id
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: The reservation description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The reservation was not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: The reservation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */
router.post('/', authMiddleware, async (req, res) => {
    const { user_id, room_id, check_in, check_out } = req.body;

    if (!user_id || !room_id || !check_in || !check_out) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { data, error } = await supabase
            .from('reservations')
            .insert({ user_id, room_id, check_in, check_out })
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: The reservation was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The reservation was not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', authMiddleware, async (req, res) => {
    const { user_id, room_id, check_in, check_out } = req.body;

    if (!user_id || !room_id || !check_in || !check_out) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { data, error } = await supabase
            .from('reservations')
            .update({ user_id, room_id, check_in, check_out })
            .eq('id', req.params.id)
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: The reservation was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The reservation was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        if (data.length === 0) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;