
import express from 'express'
import chalk from 'chalk';
import models from './models/index';
import { bodyParser } from 'json-server';
import Routes from './routers'

const port = 5000;
const app = express();

app.use(bodyParser);
app.use(Routes);

app.listen(port, function(err){
  if(err){
    console.log(err)
  }else{
    console.log(chalk.green(`App running at http://localhost:${port}`))
  }
});

