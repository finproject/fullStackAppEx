const express = require('express');
const controller = require('../controllers/category');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getAll);
router.delete('/:id', controller.remove);
router.post('/', controller.create);
router.get('/:id', controller.update);

module.exports = router;
