"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './config/config.env' });
var express_1 = __importDefault(require("express"));
var error_1 = __importDefault(require("./middlewares/error"));
var auth_1 = __importDefault(require("./routes/api/auth"));
var users_1 = __importDefault(require("./routes/api/users"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ extended: false }));
app.get('/', function (req, res) { return res.send('Server is Running...'); });
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
/*
app.post("/api/users", async (req, res) => {
    try {

      const current_timestamp = await pool.query('CURRENT_TIMESTAMP()')
      const newTodo = await pool.query(
        `INSERT INTO accounts (name, email, password) VALUES('newUser', 'newUser@gmail.com', '12345') RETURNING *`,
        
      );
  
      res.json(newTodo.rows[0]);
    } catch (err: any) {
      console.error(err.message);
    }
});

app.get("/api/auth", async (req, res) => {
    try {
        console.log('hi')
      const allTodos = await pool.query("SELECT * FROM accounts");
      res.json(allTodos.rows);
    } catch (err: any) {
      console.error(err.message);
    }
}); */
app.use(error_1.default);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, function () { return console.log("Server started in " + process.env.NODE_ENV + " mode on port " + PORT + "."); });
process.on('unhandledRejection', function (err, _promise) {
    console.log("Error message: " + err.message);
    server.close(function () { return process.exit(1); });
});