const express = require('express');
const touristSitesRouter = express.Router();
// const tourists = require('../../tourist');
const Sites = require('../models/touristSites');

const tourController = require('../controllers/touristSitesController');

function router() {
  const {getAll, countAll, insertOne,  getById, updateById} = tourController();

  touristSitesRouter.route('/')
    .get(getAll);
    touristSitesRouter.route('/:id')
    .get(getById);
    touristSitesRouter.route('/count')
    .get(countAll);
    // touristSitesRouter.route('/:id')
    // .put(updateById);
  return touristSitesRouter;
}

module.exports = router;