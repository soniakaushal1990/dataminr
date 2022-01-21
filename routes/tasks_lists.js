var express = require('express');
var router = express.Router();
var con = require('../database');

/* GET Task by Task Id. */
router.get('/:id', function (req, res, next) {
  let task_list_id = req.params.id;

  con.query('SELECT * FROM tasks_list where id = ?', task_list_id, function (error, result, fields) {

    if (error)
      res.status(500).json({
        'success': false, "error": {
          "code": 500,
          "message": "An error occurred while getting the task list!"
        }
      });

    if (result.length < 1) res.status(404).json({ 'success': true, data: [], 'message': 'Task List Not Found' });
    else {
      res.status(200).send({ 'success': true, 'data': result, 'message': null });
    }

  })

});



/* 

Create a new Task

*/

router.post('/', function (req, res, next) {

  //Validate Request

  if (!req.body.title)
    res.status(400).json('title is required field');



  let post = { title: req.body.title, task_id: req.body.task_id };



  let query = con.query('INSERT INTO tasks_list SET ?', post, function (error, results, fields) {
    if (error)
      res.status(500).json({
        'success': false, "error": {
          "code": 500,
          "message": "An error occurred while saving the task list!"
        }
      });

    res.status(201).json({ 'success': true, 'message': 'Task List Created Successfully' });
  });

});



/* 

Add/Remove Task Id from Task List

*/

router.patch('/:id', function (req, res, next) {
  let task_list_id = req.params.id;

  let task_id = req.body.task_id;

  var query = con.query('UPDATE tasks_list SET task_id = ? WHERE id = ?', [task_id, task_list_id], function (error, results, fields) {

    //In case of error
    if (error) {
      res.status(500).json({
        'success': false, "error": {
          "code": 500,
          "message": "An error occurred while fetching the tasks list!"
        }
      });
      return;
    } 

    res.status(200).send({ 'success': true, 'message': 'Task List Updated Successfully', 'data': results });
  });

});




/* 

Get List of Tasks

*/

router.get('/', function (req, res, next) {

  var query = con.query('SELECT * FROM tasks_list', function (error, results, fields) {
    if (error) res.status(500).json({
      'success': false, "error": {
        "code": 500,
        "message": "An error occurred while fetching the tasks!"
      }
    });
    res.status(200).send({ 'success': true, 'data': results, 'message': null, });
  });

});


/* 

Delete Task by Task Id

*/

router.delete('/:id', function (req, res, next) {

  let task_list_id = req.params.id;

  var query = con.query('DELETE FROM tasks_list where id = ?', task_list_id, function (error, results, fields) {
    if (error) {
      res.status(500).json({
        'success': false, "error": {
          "code": 500,
          "message": 'Error while deleting task list'
        }
      });
      return;
    }
    else {
      res.status(200).send({ 'success': true, 'data': [], 'message': "Task List deleted successfully", });
    }

  });

});


module.exports = router;
