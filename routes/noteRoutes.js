const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNoteById);
router.delete('/:id', noteController.deleteNoteById);
router.post('/:id/share', noteController.shareNoteWithUser);
router.get('/search', noteController.searchNotes);

module.exports = router;
