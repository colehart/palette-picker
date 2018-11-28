const mockProjects = [
  {
    title: 'Project1',
    palettes: ['one', 'two', 'three']
  },
  {
    title: 'Project2',
    palettes: ['four', 'five', 'six']
  }
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    title: project.title
  }, 'id')
  .then(projectId => {
    let palettesPromises = project.palettes.map(title => {
      return createPalette(knex, {
        title,
        color1: '#aaaaaa',
        color2: '#bbbbbb',
        color3: '#cccccc',
        color4: '#dddddd',
        color5: '#eeeeee',
        project_id: projectId[0]
      })
    });

    return Promise.all(palettesPromises);
  })
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};

exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = mockProjects.map(project => {
        return createProject(knex, project);
      })

      return Promise.all(projectPromises);
    });
    .then(() => console.log('Successfully seeded db'))
    .catch(error => console.log(`Error seeding db: ${error.message}`))
};
