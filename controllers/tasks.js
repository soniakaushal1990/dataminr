/* Sample for how can I optimize the code and make separate 
class called task to have all the functions related to class in one place
*/

var con = require('../database');


class Tasks {

    constructor() {

    }


    async getTaskById(task_id) {

        con.query('SELECT * FROM tasks where id = ?', task_id, function (error, result, fields) {

            if (error)
                console.log(error);
                throw error;

            if (result.length < 1) return [];
            else {
                return result;
            }

        });

    }


    getTasks(id) {

    }

    createTask(id) {

    }

    deleteTask(id) {

    }

}
