
# collection-tube

### Introduction
Collection Tube is an offline-focused youtube client app.

### Table of Contents
- Get Started
- Design
- Development
- Data
- Other Links

___

### Get Started
#### Installation
- clone the repo
- run `npm i`
- set up the DB with `npx sequelize db:migrate`
- seed the DB with `npx sequelize db:seed:all`
- start the docker container with `docker-compose up`
- once it's compiled, view the app at `http://localhost:3091`

___

### Design
#### Summary
- Most styling is handled through Tailwind  classes
- Video Player page uses color scheme generated from thumbnail image to produce gradient background

#### Technicals
- CSS: Tailwind is used for the majority of styling, otherwise using inline styling for tricky things like dynamic gradient backgrounds https://tailwindcss.com/
- Icons: Feathers icon set, through react-icons: https://feathericons.com/ / https://react-icons.github.io/react-icons/icons?name=fi
- Color extraction handled through get-image-colors: https://github.com/colorjs/get-image-colors
- Color manipulation handled through Colord: https://github.com/omgovich/colord

#### Future Plans
- light/dark theme toggle
- responsiveness
- figure out how to change the type of color blending in the gradient backgrounds, based on the brightness and saturation of the given color scheme
- netflix-style slideshow of video thumbnails in background of Subscription listing page
	- library to use for Slideshow background slideshow https://github.com/aeroheim/midori

___

### Development

#### Summary
- Layers of the app: NodeJS -> ExpressJS -> NextJS -> React

#### Technicals

#### Database
- data is stored via SQLite3 file (`/database.sqlite3`)
- Migration is handled via sequelize-cli tool. To run all migrations, run `npx sequelize-cli db:migrate`. To revert migrations, run `npx sequelize-cli db:migrate:undo`.
- Seeding is handling via sequelize-cli tool. To run the seeds, run `npx sequelize-cli db:seed:all`.

#### Future Plans

___

### Data

#### Summary
- Files are stored in  `/public/data/`
- Data is stored in  `/database.sqlite3` 

#### Routing
- API routes are located at `/pages/api/`
- Collections rely on their primary key ID for navigation
- Subscriptions and Videos rely on their YouTube-supplied ID strings

___

### Other Links


