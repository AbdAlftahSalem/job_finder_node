const printRequestData = (req, res, next) => {
    console.log("HERE")
    console.log('Request Data:', req.method, req.url, req.body);
    next();
};

module.exports = printRequestData;