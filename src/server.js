import express from 'express';
import routes from './routes.js';

const app = express();
const port = 9000;
const host = 'localhost';

//Middleware
app.use(express.json());

//routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at https://${host}:${port}`);
});
