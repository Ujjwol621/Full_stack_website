const app = require('./app');
const connectDB = require('./db');

connectDB();
app.listen(9000, () => {
  console.log('Server is running on port 9000');
});