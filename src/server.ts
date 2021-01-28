import express, { json } from 'express';
import routes from './routes';

const app = express();

app.use(json());

app.use(routes);

app.listen(8080, () => {
    console.log('✔ Server running on port 8080!');
});
