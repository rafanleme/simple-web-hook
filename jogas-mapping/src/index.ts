import { app } from './server';

const PORT = process.env.PORT || 3335;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
