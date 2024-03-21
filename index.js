const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

//DB
const courses = [
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'}
]

app.get('/test', (req, res) => {
    res.send('Test ok');
});

app.get('/', (req, res) => {
    //res.send([1,2,3,4,5]);
    res.status(200).send(courses);
});

app.get('/:id', (req,res) =>{
    //res.send(req.params);
    //res.send(courses[req.params.id]);
    const cource = courses.find(c => c.id === parseInt(req.params.id))
    if (!cource) return res.status(404).send(`The cource with the given ID (${req.params.id}) was not found!`)
    res.send(cource)
})

app.put('/:id', (req, res) =>{

    //Look up the course
    //If not exist, return 404
    const cource = courses.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send(`The cource with the given ID (${req.params.id}) was not found!`);

    //Validate
    //If invalid, return 400 - Bad request
    // const schema = Joi.object({ name: Joi.string().min(3).required() });
    // const result = schema.validate(req.body);

    //const result = validateCource(req.body);
    const { error } = validateCource(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // Update the cource
    cource.name = req.body.name;
    //Return the updated course
    res.send(cource);

});

app.delete('/:id', (req, res) => {
    const cource = courses.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send(`The item with the given ID (${req.params.id}) was not found!`);

    const index = courses.indexOf(cource);
    courses.splice(index, 1);

    res.send(cource);
})

app.post('/', (req, res) => {

    const schema = Joi.object({ name: Joi.string().min(3).required() });
    const result = schema.validate(req.body);
    console.log(result);


    //if(!req.body.name || req.body.name.length < 3){
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const cource = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(cource);
    res.send(cource);
})

//PORT
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
})

function validateCource(cource){
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    return result = schema.validate(cource);
}