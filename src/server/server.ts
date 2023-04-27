import * as express from 'express';
import apiRouter from './routes';

import * as path from 'path';

const app = express();

app.use(express.json());

app.use(express.static('public'));
app.use(apiRouter);

app.get('*', (req, res) => {
    const htmlPage = path.join(__dirname, '../public/index.html');
    res.sendFile(htmlPage);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
