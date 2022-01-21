var express = require('express');
var router = express.Router();
var con = require('../database');

/* GET Task by Task Id. */
router.get('/:task_id', function(req, res, next) {
  let task_id = req.params.task_id;
  console.log(task_id);
  con.query('SELECT * FROM tasks where id = ?',task_id,function(error,result,fields){

    if (error) 
        res.status(500).json({'success':false, "error": {
          "code": 500,
          "message": "An error occurred while getting the task!"
        }});
  
    if(result.length < 1) res.status(404).json({'success':true,data:[],'message':'Task Not Found'});
    else {
      res.status(200).send({'success':true,'data': result,'message':null});
    }
    
  })

});



/* 

Create a new Task

*/

router.post('/', function(req, res, next) {

    //Validate Request

    if(!req.body.title)
      res.status(400).json('title is required field');



  let post  = {title: req.body.title, description : req.body.description};



  let query = con.query('INSERT INTO tasks SET ?', post, function (error, results, fields) {
    if (error) 
        res.status(500).json({'success':false, "error": {
          "code": 500,
          "message": "An error occurred while saving the task!"
        }});
    
        res.status(201).json({'success':true,'message':'Task Created Successfully'});
  });

});



/* 

Update Task

*/

router.patch('/:task_id', function(req, res, next) {
  let post = req.body;
  var query = con.query('UPDATE tasks SET ?', post, function (error, results, fields) {

    //In case of error
    if (error) res.status(500).json({'success':false, "error": {
      "code": 500,
      "message": "An error occurred while fetching the tasks!"
    }});

      res.status(200).send({'success':true,'message':'Task Updated Successfully','data':[]});
  });

});




/* 

Get List of Tasks

*/

router.get('/', function(req, res, next) {
  
  var query = con.query('SELECT * FROM tasks',function (error, results, fields) {
    if (error) res.status(500).json({'success':false, "error": {
      "code": 500,
      "message": "An error occurred while fetching the tasks!"
    }});
      res.status(200).send({'success':true,'data':results,'message' : null,});
  });

});


/* 

Delete Task by Task Id

*/

router.delete('/:id', function(req, res, next) {
  
  let task_id =  req.params.id;

  var query = con.query('DELETE FROM tasks where id = ?',task_id,function (error, results, fields) {
    if (error) {

      if(error.code == 'ER_ROW_IS_REFERENCED_2' ){
          res.status(500).json({'success':false, "error": {
            "code": 500,
            "message": `Task Id - ${task_id} is referenced in Task List , Cannot be deleted`
          }});
         
      } else {
        res.status(500).json({'success':false, "error": {
          "code": 500,
          "message": `Task Id - ${task_id} is referenced in Task List , Cannot be deleted`
        }});
    
      }
      return;       
    } 
      res.status(200).send({'success':true,'data':[],'message' : "Task deleted successfully",});
  });

});


module.exports = router;
