import express from 'express';
import mapper from './routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
mapper(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
