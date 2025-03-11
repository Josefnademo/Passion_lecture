import { sequelize } from "../db/sequelize.js";
import { success } from "../helper.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await sequelize.models.t_note.findAll({
      where: { book_id: req.params.id },
    });
    res.json(success("Notes retrieved successfully", notes));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notes", data: error });
  }
};

export const addNote = async (req, res) => {
  try {
    const note = await sequelize.models.t_note.create({
      value: req.body.value,
      book_id: req.params.id,
    });
    res.status(201).json(success("Note added successfully", note));
  } catch (error) {
    res.status(500).json({ message: "Error adding note", data: error });
  }
};
