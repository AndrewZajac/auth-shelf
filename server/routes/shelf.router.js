const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log('/shelf GET route');
  // console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log('/shelf POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  try {
      const result = await pool.query(`INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3) RETURNING *;`, [req.body.description, req.body.image_url, req.user.id]);
      res.send(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.sendStatus(500);
  }
  
});
/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
  console.log('/shelf DELETE route');
  console.log('req params id log', req.params.id);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  try {
    await pool.query
    (
      `DELETE FROM item
      WHERE item.id = $1 AND item.user_id = $2;`, [req.params.id, req.user.id]);
     res.sendStatus(200);
  } catch (err){
    console.error(err);
    res.sendStatus(500);
  }
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, async (req, res) => {
  console.log('/shelf PUT route');
  console.log('req params id log', req.params.id);
  console.log('is authenticated?', req.isAuthenticated);
  console.log('user',req.user);

  try{
    const result = await pool.query(
      `UPDATE "item"
      SET "description" = $1, "image_url" = $2
      WHERE item.user_id = $3 AND item.id = $4`, [req.body.description, req.body.image_url, req.user.id, req.params.id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  console.log('/myShelf GET route');
  // console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  let queryText = `SELECT * FROM "item" where item.user_id = $1`;
  pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});


module.exports = router;
