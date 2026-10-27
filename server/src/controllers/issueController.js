import Issue from '../models/Issue.js';

export const createIssue = async (req, res) => {
  const { title, description, category, location } = req.body;

  const issue = await Issue.create({
    title,
    description,
    category,
    location,
    createdBy: req.user._id
  });

  res.status(201).json(issue);
};

export const getIssues = async (req, res) => {
  let query = {};
  if (req.user.role === 'student') {
    query.createdBy = req.user._id;
  }

  const { status, category } = req.query;
  if (status) query.status = status;
  if (category) query.category = category;

  const issues = await Issue.find(query).populate('createdBy', 'name email').sort('-createdAt');
  res.json(issues);
};

export const getIssueById = async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate('createdBy', 'name email');

  if (!issue) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  if (req.user.role === 'student' && issue.createdBy._id.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  res.json(issue);
};

export const updateIssueStatus = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  issue.status = req.body.status || issue.status;
  issue.priority = req.body.priority || issue.priority;
  issue.updatedBy = req.user._id;

  const updatedIssue = await issue.save();
  res.json(updatedIssue);
};

export const deleteIssue = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) {
    return res.status(404).json({ message: 'Issue not found' });
  }

  if (req.user.role === 'student' && issue.createdBy.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  if (req.user.role === 'student' && issue.status !== 'Pending') {
    return res.status(400).json({ message: 'Cannot delete issue that is not pending' });
  }

  await issue.deleteOne();
  res.json({ message: 'Issue removed' });
};
