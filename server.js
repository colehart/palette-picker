const bodyParser = require('body-parser');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => response.status(200).json(
      projects
    ))
    .catch((error) => response.status(500).json({
      error: error.message
    }));
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for(let requiredParam of ['title']) {
    if (!project[requiredParam]) {
      return response.status(422).json({
        error: `Expected format: { title: <String> }. You're missing the "${requiredParam}" property.`
      })
    }
  }

  database('projects').insert(project, 'id')
    .then(projectIds => response.status(201).json({
      id: projectIds[0],
      message: `Project "${project.title}" successfully created!`
    }))
    .catch(error => response.status(500).json({
      error: error.message
    }))
})

app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  const { project_id } = request.params;

  database('palettes').where('project_id', project_id).select()
    .then(palettes => response.status(200).json(
      palettes
    ))
    .catch(error => response.status(500).json({
      error: 'Error fetching palettes'
    }))
})

app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
  const palette = request.body;

  for(let requiredParam of [
      'title',
      'color1',
      'color2',
      'color3',
      'color4',
      'color5',
      'project_id'
    ]) {
    if (!palette[requiredParam]) {
      return response.status(422).json({
        error: `Expected format: { title: <String>, color1: <String>, color2: ,String>, color3: <String>, color4: <String>, color5: <String> }, project_id: <String> }.\n\nYou're missing the "${requiredParam}" property.`
      })
    }
  }

  database('palettes').insert(palette, 'id')
    .then(paletteIds => response.status(201).json({
      id: paletteIds[0],
      message: `Palette "${palette.title}" successfully created! and assigned to project with id of "${palette.project_id}"`
    }))
    .catch(error => response.status(500).json({
      error: error.message
    }))
})

app.get('/api/v1/projects/:project_id/palettes/:palette_id', (request, response) => {
  const { project_id, palette_id } = request.params;

  database('palettes').where({
    'id': palette_id,
    'project_id': project_id
  }).select()
    .then(palette => response.status(200).json(
      palette
    ))
    .catch(error => response.status(500).json({
      error: `Error fetching palette: ${error.message}`
    }))
})

app.delete('/api/v1/projects/:project_id/palettes/:palette_id', (request, response) => {
  const { project_id, palette_id } = request.params;

  database('palettes').where({
    'id': palette_id,
    'project_id': project_id
  }).delete()
    .then(palette => response.status(200).json({
      palette,
      message: `Palette has been deleted from project #${project_id}.`
    }))
    .catch(error => response.status(500).json({
      error: `Error deleting palette: ${error.message}`
    }))
})

app.use((request, response, next) => {
  response.status(404).send('Sorry, the path you entered does not exist.')
})

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}.`))