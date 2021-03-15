var express = require('express')
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();



const db_name = 'data/apptest.db'
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite Database. Congrats')
});

/* GET home page. */
router.get('/', function(req, res, next) {
    const sql = "SELECT * From JHA"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      const sql_search = `SELECT * FROM JHASTEPS`;
      
      db.all(sql_search, [], (err, moreRows) => {
        if (err) {
          return console.error(err.message);
        }
        ret = [{'main': rows, 'step': moreRows}];
        console.log(ret)

        res.status(200).json( ret );
      });
      
      
    });
});



router.get('/:id', function(req, res, next) {
    let name = '';
    const sql_search = `SELECT * FROM JHA WHERE JHA.ID = ${req.params.id}`;
    // console.log(req.params);
    db.all(sql_search, [], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(row)
      res.json( row );
    });
});

router.get('/steps/:id', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // app.get("/books", (req, res) => {
    // const sql = "SELECT * FROM Books ORDER BY Title"
    let name = '';
    const sql_gogo= `SELECT * FROM JHA WHERE JHA.ID = ${req.params.id}`;
    // console.log(req.params);
    db.all(sql_gogo, [], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      // console.log(row);
      name = row[0].job;
      // console.log(name)
      const sql_gogogo = `SELECT * FROM JHASTEPS WHERE JHASTEPS.job='`+row[0].job+`';`;
      // console.log(row);
      
      db.all(sql_gogogo, [], (err, thisRow) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(thisRow)
        res.json( thisRow );
      });
    });

  // });
});


router.post('/', function(req, res, next) {
    const jobData = Object.values(req.body.data);
    // const stepData = Object.values(req.body.stepData);

    // console.log(data[0]);
    // console.log(data[1]);

    db.run(`INSERT INTO JHA(job, selectedDate, status, title, supervisor, analyst, 
      organization, location, department, review, ppe, training) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, jobData);

    console.log("Successful Insert of JHA");

    // var iter;
    req.body.stepData.forEach(step=>{
      console.log(step);
      db.run(`INSERT INTO JHASTEPS(step, seqJob, potHaz, control, job) VALUES(?, ?, ?, ?, ?)`, Object.values(step), err => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Successful Work");
      });
    });
      
    res.status(200).send("Request successful")
});


router.put('/:id', function(req, res, next) {
  const data = Object.values(req.body);
  console.log(req.body);
  const sql_update = `UPDATE JHA SET job = ?, selectedDate = ?, status = ?, title = ?, supervisor = ?, analyst = ?,
    organization = ?, location = ?, department = ?, review = ?, ppe = ?, training = ? WHERE ID = ${req.params.id};`
  db.run(sql_update, data);
  res.status(200).send("Request successful");

});

router.delete('/:id', function(req, res, next) {
  const job_name = `SELECT job FROM JHA WHERE JHA.ID=${req.params.id};`;
  const sql_delete = `DELETE FROM JHA WHERE JHA.ID=${req.params.id};`;
  let name = '';

  db.all(job_name, [], (err, row) => {
    if (err) {

      return console.error(err.message);
    }
    console.log('row info: '+ row)
    name = row[0].job;
    const sql_step_delete = `DELETE FROM JHASTEPS WHERE job='${name}';`;
    console.log(sql_step_delete);
    db.run(sql_step_delete, err => {
      if (err) {
        console.log('step');
        return console.error(err.message);
      }
      console.log("Successful Step Delete");
    });
  });

  db.run(sql_delete, err => {
    if (err) {
      console.log('main')
      return console.error(err.message);
    }
    console.log("Successful Main Delete");
  });
  res.status(200).send("Request successful");

});


// export default router;
module.exports = router;