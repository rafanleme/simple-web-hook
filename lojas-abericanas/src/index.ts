import { app } from './server';

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
