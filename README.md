[![Waffle.io - Columns and their card count](https://badge.waffle.io/colehart/palette-picker.svg?columns=all)](https://waffle.io/colehart/palette-picker)

# Palette Picker - Palatable Palettes

## A jQuery single page app to generate random colors, complete with Node.js, Express, and Knex.js backend. With, Palatable Palettes you can uniquely name projects, add and delete multiple palettes to each project, and use the same palettes across projects.

## How to Use

## See it live
Pick your palettes on Heroku: [https://palatable-palettes.herokuapp.com/](https://palatable-palettes.herokuapp.com/).

![A screen recording of the app](https://github.com/colehart/allyship/blob/master/src/assets/images/screenRecording.gif "App Screen Recording")

### Developers:
#### Install and Start Server
* Clone this repo.

* `npm install`

* `npm start`

#### Create Postgres Database and Run Migrations
*  `psql CREATE DATABASE palettepickers`

* `knex migrate:latest`

* `knex seed:run`

### API Endpoints
```
/api/v1/projects
/api/v1/project/:project_id/palettes
/api/v1/project/:project_id/palettes/:palette_id
```

## Technologies Used
- jQuery
- Node.js
- Express
- Knex.js

## Project Requirements
Project spec can be found [here](http://frontend.turing.io/projects/palette-picker.html).

## Wireframe
Palatable Palettes is a single page web app with different colors populating a generator. You can uniquely name projects, add and delete multiple palettes to each project, and use the same palettes across projects.

### Welcome Page
![Welcome Page Wireframe](https://github.com/colehart/allyship/blob/master/src/assets/images/desktop%E2%80%93%201.png "Welcome Page Wireframe")

## Design Inspiration
I wanted to emulate the [Coolors.co](https://coolors.co/464655-94958b-b7b6c1-d5cfe1-eddfef) Generate page for the main color palette portion. I also used the bare bones wireframes from the [project spec](http://frontend.turing.io/projects/palette-picker.html) to guide the project portion of the layout.

### Coolors.co
![Sample Coolors Generate Page]('./public/assets/images/coolorsScreenshot.png' "Sample Coolors Generated Palette")

### Project Spec
![Project Spec Wireframe](http://frontend.turing.io/assets/images/palette-picker-wireframe.png "Project Spec Wireframe")
