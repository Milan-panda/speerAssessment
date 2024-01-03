const Note = require('../models/Note');

async function getAllNotes(req, res) {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ createdBy: userId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function getNoteById(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function createNote(req, res) {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
      createdBy: req.user.id,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function updateNoteById(req, res) {
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function deleteNoteById(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function shareNoteWithUser(req, res) {
  const { userIdToShare } = req.body; 
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ _id: noteId, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const userToShare = await User.findById(userIdToShare);
    if (!userToShare) {
      return res.status(404).json({ message: 'User to share with not found' });
    }

    if (!note.sharedWith.includes(userIdToShare)) {
      note.sharedWith.push(userIdToShare);
      await note.save();
    } else {
      return res.status(400).json({ message: 'Note already shared with this user' });
    }

    res.json({ message: 'Note shared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}


async function searchNotes(req, res) {
  const { query } = req.query; 

  try {
    const userId = req.user.id; 
    const notes = await Note.find({
      $and: [
        { $or: [{ createdBy: userId }, { sharedWith: userId }] },
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
          ],
        },
      ],
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}


module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNoteById,
  deleteNoteById,
  shareNoteWithUser,
  searchNotes,
};
