import express from "express";
import {
  getComments,
  addComment,
} from "../../controllers/commentsController.js";

const router = express.Router({ mergeParams: true });

router.get("/", getComments);

router.post(
  "/",
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addComment
);

export default router;
