# Kraken
### Description
Kraken solution is NodeJS app that provides functionality of advanced filtering
of earthquakes. Earthquakes data is fetched from https://www.emsc.eu/service/rss/ , 
currently fetches and process only data from mediterian region
https://www.emsc.eu/service/rss/rss.php?typ=emsc&min_lat=10&min_long=-30&max_long=65 .

### Dependencies
ExpressJs, TypeScript, InversifyJS, TypeORM, Axios, Sqlite3, Swagger, Cron

### Environment variables recommended for changing
* PORT - port on which app is started default value is 8000
* RunTestSchedulerAtStart - default is false if set to true initialize test scheduler at start of app
* TestSchedulerCronExpression - default value is */1 * * * *, runs scheduler every one minute
* RunEarthquakeSchedulerAtStart - default is true, initialize test scheduler at start of app
* EarthquakeApiSchedulerCronExpression - default value is */5 * * * *, runs scheduler every five minutes

### Running App
* Open terminal in root of kraken project
* Enter and run : 
```
npm install
```
* Enter and run : 
```
npm run build
```
* Enter and run : 
```
npm run dev
```
* Open in favorite browser link to docs provided by app

### Database
Is sqlite3 can be found in root of kraken project

#### Applying Database Changes
* For any newly generated change on entity or creation of new one create migration
* To create migration in terminal run :
```
npx typeorm-ts-node-esm migration:generate ./src/domain/migrations/locationPrimaryKeyChange -d ./app-data-source.ts
```
* Open migration file and copy migration class name 
* Add newly generated migration to app-data-source.ts under migrations also if entity was added do the same for entity
* To apply migration in terminal run : 
```
npx typeorm-ts-node-esm migration:run -d ./app-data-source.ts  
```
