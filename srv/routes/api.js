const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/*
select genre, count(genre) from library group by genre order by count(genre) DESC;
select genre, count(genre) from library group by genre order by genre;
update library set genre = 'Hip-Hop' where genre in ('HIP HOP','Classic Hip-Hop','R&B/ Hip Hop','Rap & Hip Hop','Southern Hip-Hop','Hip  Hop','Old School Hip Hop','Rap & Hip-Hop','Hip Hop/Rap', 'HIP HOP','Intro/Hip-Hop','Classic Hip-Hop','East Coast Hip-Hop','Hip Hip','R&B/ Hip Hop','Rap & Hip Hop');

*/

router.get('/genres', (req, res, next) => {
  req.app
    .get('db')
    .all('select genre, count(genre) as count from library group by genre HAVING count > 0 order by genre')
    .then(genres => {
      //console.log(genres);
      return res.status(200).json(genres);
    })
    .catch(reason => {
      next(reason);
    });
});

router.put('/genres', (req, res, next) => {
  let db = req.app.get('db');
  let genreObj = req.body;
  let dupes = genreObj.dupeGenres.map(genre => {
    return genre.genre;
  });

  dupes.forEach(dupe => {
    db
      .run('update library set genre = ? where genre = ?', genreObj.destGenre.genre, dupe)
      .then(result => {
        console.log(result);
      })
      .catch(reason => {
        return res.status(500).json(reason);
      });
  });
  return res.status(200).json({ status: 'A-OK' });
});

router.get('/crates', (req, res, next) => {
  let db = req.app.get('db');
});

router.put('/smartcrates', (req, res, next) => {
  let db = req.app.get('db');

  //only create crates for genres with > 10 tracks
  db
    .each('select genre from library group by genre HAVING count(genre) > 5')
    .then((err, genre) => {
      console.log(genre);
    })
    .catch(reason => {
      next(reason);
    });
  // INSERT INTO crates (name, locked, autodj_source) VALUES (?,?,?);
});
module.exports = router;
