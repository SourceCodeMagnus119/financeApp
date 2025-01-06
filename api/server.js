/**
 * @param DILO - your personal financing App
 * @author PAUL JS GOWASEB <SourceCodeMagnus119> email: <paulusg131@gmail.com>
 */
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
// const Database = require('./db/database');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.session());
app.use(passport.initialize);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));
app.use(session({ secret: process.env.TOKEN_KEY, cookie: { maxAge: 60000 }}));
app.use(helmet({
    strictTransportSecurity: true,
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "https://dilo.com"]
        }
    }
}));
app.get('/', (req, res, next) => {
    console.log(`Middleware Called`);
    next();
});
app.use('/', (req, res) => {
    res
    .status(200)
    .json({ message: `Welcome to Dilo`});
});

/**
 * @param API Endpoints.
 */
const user = require("./routes/user");
const transactions = require('./routes/transactions');

app.use('/', user);
app.use('/', transactions);

/**
 * @param rate Limiter.
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    Max: 100,
    handler: (req, res) => {
        res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
});

app.use(limiter);

/**
 * @param Server Session Implementation.
 */
const accessSession = require('./middleware/session');

app.get('/', accessSession);

/**
 * @param Error Handling.
 */

/**
 * @param Server Logging.
 */

const port = process.env.PORT;
const time = new Date();
app.listen(port, () => {
    console.log(
        `Server running on port ${port} __A DILIGENT MIND DESTINED FOR GREATNESS`,
        time
    )
});

module.exports = { app };