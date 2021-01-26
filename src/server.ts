import express, { json } from 'express';
import routes from './routes';

const app = express();

app.use(json());

app.get('/', (req, res) => {
    return res.json({ message: "Hello World!" });
})

app.listen(8080, () => {
    console.log('✔ Server running on port 8080!');
});
