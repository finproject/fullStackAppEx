const app = require('./app');
const port = process.env.PORT || 6000;
app.listen(5000, () => { console.log(`Server has been started on  ${port}`);
});
