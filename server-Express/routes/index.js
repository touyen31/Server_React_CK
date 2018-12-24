var createError = require('http-errors');
const account = require('./account')
const payment = require('./payment')
const tx = require('./tx')
module.exports = function (app) {

    app.use('/account',account)
    app.use('/payment', payment)
    app.use('/tx', tx);
    app.use(function(req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        console.log(err)
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500).end();
    });
}