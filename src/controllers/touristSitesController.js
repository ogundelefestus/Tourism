const Sites = require('../models/touristSites');

function tourController() {

  function getAll(req, res) {
      Sites.find({}).exec()
      .then(docs => res.json(docs))
      .catch(err => console.log(`Oops! ${err}`));
  }

  // count all
  function countAll(req, res) {
    try {
      Sites.estimatedDocumentCount({}, function(err, docx) {
        if (err) return console.error(err);
        res.json(docx);
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  // create new
  function insertOne(req, res) {
    const obj = new Sites(req.body);
    try {
      obj.save(function (err, obj) {
        if (err) return console.error(err);
        res.status(200).json(obj);
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  // find by id
  function getById(req, res) {
    try {
      Sites.findById({ _id: req.params.id }, function (err, obj) {
        if (err) return console.error(err);
        // res.json(obj);
        res.render(
          'siteView', { site: obj });
      })
    } catch (err) {
      if(err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success:false,
          error: messages
        })
      } else {
        return res.status(500).json({
          success:false,
          error: 'Server error'
        })
      }
    }
  }

  // update by id
  function updateById(req, res) {
    try {
      Sites.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, obj) {
        if (err) return console.error(err);
        res.sendStatus(200).json(obj);
      })
    } catch (err) {
      console.log(err.stack);
    }
  }
  // // delete by id
  // app.delete('/:id', function (req, res) {
  //   (async function mongo() {
  //     try {
  //       Sites.findOneAndRemove({ _id: req.params.id }, function (err) {
  //         if (err) return console.error(err);
  //         res.sendStatus(200);
  //       });
  //     } catch (err) {
  //       console.log(err.stack);
  //     }
  //   })();
  // });

  return {
    getAll,
    countAll,
    insertOne,
    getById,
    updateById
  };
}

module.exports = tourController;