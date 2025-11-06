import { connectToDb } from './db.js';
import express from 'express';
import cors from 'cors';
import routes, { setDb } from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());

export const initApp = async () => {
    const db = await connectToDb();
    setDb(db);
    app.use('/api', routes);
    return app;
};


export default app;
