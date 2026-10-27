import express from 'express';
import { createIssue, getIssues, getIssueById, updateIssueStatus, deleteIssue } from '../controllers/issueController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createIssue).get(protect, getIssues);
router.route('/:id').get(protect, getIssueById).delete(protect, deleteIssue);
router.route('/:id/status').put(protect, admin, updateIssueStatus);

export default router;
