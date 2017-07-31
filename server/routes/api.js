const { Router } = require('express');;
const passport = require('passport');

const initRouter = (data) => {
    const router = new Router();
    router.get('/', (req, res) => {
        res.send('api works');
    });

    router.route('/login')
        .get((req, res) => {
            return res.json(req.user);
        })
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    return router;
}


module.exports = initRouter;
