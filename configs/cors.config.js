/* const createError = require('http-errors');
const cors = require('cors');

const allowedOrigins = process.env.CORS.ORIGINS || ["http://localhost:3000"];

module.exports = cors({
  origin: (origin, next) => {
    const isAllowed = origin || allowedOrigins.some(o => o === origin);
    if (isAllowed) {
      next(null, isAllowed);
    } else {
      next(createError(401, "Not allowed byyy CORS"));
    }
  },
  credentials: true 
}) */

//esto de arriba es lo que cogí de clase según Carlos lo iba haciendo, pero no me funciona..


const createError = require('http-errors');
const cors = require('cors');

const allowedOrigins = [
  "http://localhost:3000"
]

module.exports = cors({
  origin: (origin, next) => {
    const allowed = !origin || allowedOrigins.indexOf(origin) !== -1;
    if (allowed) {
      next(null, allowed);
    } else {
      next(createError(401, 'Not allowed by CORS'));
    }
  },
  credentials: true
});