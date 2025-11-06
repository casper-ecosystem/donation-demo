import app, { initApp } from './app.js';
import { connectToDb } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    const MAX_RETRIES = 20;
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            // await connectToDb();
            await initApp();
            console.log('✅ Connected to MySQL and ensured table exists');
            app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
            return;
        } catch (err) {
            attempts++;
            console.log(`⏳ DB not ready (attempt ${attempts}/${MAX_RETRIES})...`);
            await new Promise((res) => setTimeout(res, 5000));
        }
    }

    console.error('❌ Could not connect to MySQL after several attempts');
    process.exit(1);
};

startServer();
