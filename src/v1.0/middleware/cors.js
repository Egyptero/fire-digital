module.exports = function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "*");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers","*");

    next();
};