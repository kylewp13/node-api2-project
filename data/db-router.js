const express = require('express');

const router = express.Router();

const Db = require('./db');

//------------------POST---------------
router.post('/', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res
          .status(400)
          .json( { errorMessage: "Please provide title and contents for the post." } )
    } else {
        Db.insert(req.body)
          .then(post => {
            res
              .status(201)
              .json(post);
          })
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "There was an error while saving the post to the database" })
          })
    }
});

//------------------POST---------------
router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const { text } = req.body

    if (!text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." })
    } else {
        Db.insertComment(req.body)
          .then(comment => {
              if (comment) {
                res
                  .status(201)
                  .json(comment)
              } else {
                res
                  .status(404)
                  .json({ message: "The post with the specified ID does not exist." })
              }
          })
          .catch(err => {
              res
                .status(500)
                .json({ error: "There was an error while saving the comment to the database" })
          })
    }
});

//------------------GET---------------
router.get('/', (req, res) => {
    Db.find()
      .then(posts => {
        res
          .status(200)
          .json(posts)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." })
      })
});

//------------------GET---------------
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Db.findById(id)
      .then(post => {
          if (post) {
            res
            .status(200)
            .json(post)
          } else {
            res
              .status(404)
              .json({ message: "The post with the specified ID does not exist." })
          }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." })
      })
});

//------------------GET---------------
router.get('/:id/comments', (req, res) => {
    const id = req.param.id;

    Db.findCommentById(id)
      .then(comment => {
          if (comment) {
            res
              .status(200)
              .json(comment)
          } else {
            res
              .status(404)
              .json({ message: "The post with the specified ID does not exist." })
          }
      })
      .catch(err => {
        console.log('err', err)
        res
          .status(500)
          .json({ error: "The comments information could not be retrieved." })
      })
});

//------------------DELETE---------------
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Db.remove(id)
        .then(post => {
            if (post) {
                res
                  .status(200)
                  .json(post)
            } else {
                res
                  .status(404)
                  .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
              .status(500)
              .json({ error: "The post could not be removed" })
        })
});

//------------------PUT---------------
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body
     
    if (!title || !contents) {
        res
          .status(400)
          .json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Db.update(id, req.body)
            .then(post => {
                if (post) {
                    res
                      .status(200)
                      .json(post)
                } else {
                    res
                      .status(404)
                      .json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                  .status(500)
                  .json({ error: "The post information could not be modified." })
            })
    }
});


module.exports = router