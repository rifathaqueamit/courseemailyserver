const passport = require('passport');

// Routes
module.exports = (app) => {

    // Route handler get
    /* app.get('/', (req, res) => {
        res.send({ hi: 'there' });
    }); */

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    // Test purpose
    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send("Not logged in");
        }
    });

    app.get('/api/logout', (req, res) => {
        if (req.user) {
            req.logout();
        }
        res.send("Logged out");
    });
};