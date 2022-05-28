const express = require('express')
const app = express()
const fs = require('fs');
const port = 8080;
const cors = require('cors')

app.use(cors())


app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/employees/', (req, res) => {
  fs.readFile('../db/employees-db.json', 'utf8', (err, employees) => {
     res.send(employees)
  })
})

app.get('/employees/:id', (req, res) => {
  fs.readFile('../db/employees-db.json', 'utf8', (err, employees) => {
    const allEmployees = JSON.parse(employees)
    res.send(allEmployees.find((employee) => employee.id.toString() === req.params.id.toString()))
  })
})

app.get('/contracts', (req, res) => {
  fs.readFile('../db/contracts-db.json', 'utf8', (err, contracts) => {
      res.send(contracts)
  })
})

app.get('/contracts/:id', (req, res) => {
  fs.readFile('../db/contracts-db.json', 'utf8', (err, contracts) => {
    const allContracts = JSON.parse(contracts)
    res.send(allContracts.find((contract) => contract.id.toString() === req.params.id.toString()))
  })
})

app.listen(port, () => {
  console.log(`Server ready on: localhost:${port}`);
});

