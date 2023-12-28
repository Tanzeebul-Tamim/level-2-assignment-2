import express, { Application } from 'express';
const port = 3000;
const app: Application = express();

app.listen(port, () => {
  console.log(`Your app, Assignment-2 is listening on port ${port}`);
});

export default app;
