import app from './index.js';
import {db} from './shared/db/index.js';

const port = process.env.PORT;
const host = process.env.HOST

//Database connection
db.connect()
  .then(obj => {
    console.log('Database connected');
    obj.done();
  })
  .catch(error => {
    console.error('Database connection failed:', error.message);
  });

  //App.listen (What app.listen does 1. Starts the HTTP server 2. Listens for incoming requests 3. Keeps the app running)
  app.listen(port, () => {
  console.log(`Server is running on port: ${host}:${port}`)
});