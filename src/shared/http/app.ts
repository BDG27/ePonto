import cors from 'cors';
import express from 'express';
import { errorsHandler } from '../handlers/ErrorsHandler';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json())
app.use(routes)
app.use(errorsHandler)

export { app };

