var SERVER_NAME = 'students-api'
var PORT = 8000;
var HOST = '127.0.0.1';
var getCounter = 0;
var getCounterById = 0;
var postCounter =0;

var restify = require('restify')
  , studentsSave = require('save')('students')
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Endpoints')
  console.log('%s/students',server.url)
  console.log('%s/students/id',server.url)
})

server .use(restify.fullResponse()).use(restify.bodyParser())


server.get('/students', function (req, res, next) {
  getCounter++;
  console.log('Get Count : '+getCounter)
    studentsSave.find({}, function (error, students) {
      res.send(students)
    })
  })

  server.get('/students/:id', function (req, res, next) {
    getCounterById++;
    console.log('Get Count by ID : '+getCounterById)
    studentsSave.findOne({ _id: req.params.id }, function (error, student) {
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        if (student) {
          res.send(student)
        } else {
          res.send("Student Not Found!!")
        }
      })
    })

    server.post('students', function(req, res, next){
      postCounter++;
      console.log('Post Count : '+postCounter)
      if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Name Required!!'))
      }
      if (req.params.course === undefined ) {
        return next(new restify.InvalidArgumentError('Course Required!!'))
      }

      var newStudent = {
        name: req.params.name, 
        course: req.params.course
      }

      studentsSave.create( newStudent, function (error, student) {
        
            if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        
            res.send(201, student)
          })
    })

    server.put('/students/:id', function (req, res, next) {
      
        if (req.params.name === undefined ) {
          return next(new restify.InvalidArgumentError('Name Required!!'))
        }
        if (req.params.course === undefined ) {
          return next(new restify.InvalidArgumentError('Course Required!!'))
        }
        
        var newStudent = {
          _id: req.params.id,
          name: req.params.name, 
          course: req.params.course
        }

        studentsSave.update(newStudent, function (error, student) {
          
              if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
          
              res.send(200)
            })
          })
          

          server.del('/students/:id', function (req, res, next) {
            
              studentsSave.delete(req.params.id, function (error, student) {
            
                if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            
                res.send()
              })
            })
            