import { config } from 'dotenv';

import app from './app';

config();

// This enables dotenv configulations
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('info', `Magic runs  on http://localhost:${port}`));
export default app;
