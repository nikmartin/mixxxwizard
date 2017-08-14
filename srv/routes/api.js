const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/genres', (req, res, next) => {
  req.app
    .get('db')
    .all('select genre, count(genre) as count from library group by genre HAVING count > 0 order by genre')
    .then(genres => {
      console.log(genres);
      return res.status(200).json(genres);
    })
    .catch(reason => {
      next(reason);
    });
});

module.exports = router;
