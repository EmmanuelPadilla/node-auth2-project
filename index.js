require("dotenv").config();

const server = require("./AUTH/api/server");

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
