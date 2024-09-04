import express from 'express';
import mapper from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

mapper(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
