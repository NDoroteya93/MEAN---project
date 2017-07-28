const { Router } = require('express');;
const passport = require('passport');

const initRouter = (data) => {
    const router = new Router();
    router.get('/', (req, res) => {
        res.send('api works');
    });
    // .get('/posts', (req, res) => {
    //     // Get posts from the mock api
    //     // This should ideally be replaced with a service that connects to MongoDB
    //     axios.get(`${API}/posts`)
    //         .then(posts => {
    //             res.status(200).json(posts.data);
    //         })
    //         .catch(error => {
    //             res.status(500).send(error)
    //         });
    // });

    router.route('/login')
        .get((req, res) => {
            return res.json(req.user)
        })
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        }));

    return router;
}


module.exports = initRouter;
