const bodyParser = require('body-parser');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.locals.projects = [{title: 'Project1'}, {title: 'Project2'}];

app.set('port', process.env.PORT || 3000);


app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => response.status(200).json( projects ))
    .catch((error) => response.status(500).json({ error: error.message }));
})

app.post('/api/v1/projects', (request, reponse) => {
  const project = request.body;

  for(let requiredParam of ['title']) {
    if (!project[requiredParam]) {
      return response.status(422).json({ error: `Expected format: { title: <String> }. You're missing the "${requiredParam}" property.`})
    }
  }

  database('projects').insert(project, 'id')
    .then(project => response.status(201).json({ id }))
    .catch(error => response.status(500).json({ error: error.message }))
})


/*
projects
  - /api/v1/projects
    - get (view all existing projects)
    - post (create a new project)
*/

/*
palettes
  - /api/v1/project/:project_id/palettes
    - get (view all existing palettes associated with particular project)
    - post (create new palette associated with particular project)

  - /api/v1/project/:project_id/palettes/:palette_id
    - get (view specific palette associated with particular project)
    - delete (delete specific palette associated with particular project)
*/

app.use((request, response, next) => {
  response.status(404).send('Sorry, the path you entered does not exist.')
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}.`))