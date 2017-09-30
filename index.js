var SERVER_NAME = 'students-api'
var PORT = 8000;
var HOST = '127.0.0.1';


var restify = require('restify')
  , studentsSave = require('save')('students')
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

server .use(restify.fullResponse()).use(restify.bodyParser())


server.get('/students', function (req, res, next) {
    studentsSave.find({}, function (error, students) {
      res.send(students)
    })
  })

  server.get('/students/:id', function (req, res, next) {
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

            server.del('/students', function (req, res, next) {
              
                studentsSave.delete(studentsSave, function (error, students) {
              
                  if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
              
                  res.send()
                })
              })
            