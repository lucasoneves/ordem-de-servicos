import express from 'express';

const app = express();

app.use(express.json());

let osList = [
  {
    id: 'f76cbb13-8dac-40b4-8954-dbc396a8d0df',
    title: 'Conserto de máquina LG'
  },
  {
    id: '090ac745-7ea4-4d97-adae-03c0943876c3',
    title: 'Troca da placa lavadora (Brastemp)'
  }
]

app.get('/', (req, res) => {
  res.status(200).send("Curso de node.js Funcionaaa");
})

app.get('/os', (req, res) => {
  res.status(200).json(osList)
})

app.post('/os', (req, res) => {
  osList.push(req.body);
  res.status(201).json({ message: "success", status: res.statusCode});
})

app.put('/os/:id', (req, res) => {
  const item = osList.findIndex(o => o.id === req.params.id);
  osList[item] = req.body;
  res.status(200).json({ message: "success", status: res.statusCode });
})

app.delete('/os/:id', (req, res) => {
  const updatedList = osList.filter(o => o.id !== req.params.id);
  osList = updatedList;
  console.log(updatedList);
  res.json({ message: "success", status: res.statusCode });
})

export default app;