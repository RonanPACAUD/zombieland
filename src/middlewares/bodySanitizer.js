const sanitizer = require('sanitizer');

const bodySanitizer = (req, res, next) => {
    if (req.body) { 
        for (let property in req.body) { 
            req.body[property] = sanitizer.escape(req.body[property]);
        }
    }
    next();
}

module.exports = bodySanitizer;