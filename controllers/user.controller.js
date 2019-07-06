var User = require('../models/user.model');
var {getAllActiveSessions} = require('../redis');
var io = require('../socket');

const register = async (req, res, next) => {
    try {
        const userObj = await User.create(req.body);
        res.render('login');
    }catch(e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const userObj = await User.login(req.body);
        req.session.user = { email: userObj.email, name: userObj.name };
        io.emit('user-login',{ email: userObj.email, name: userObj.name });
        res.redirect('/list');
    }catch(e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const sessions = await getAllActiveSessions();
        console.log('sessions', sessions);
        let users = sessions.map(session => {
            return session.user
        });
        res.locals.users = users;
        res.render('list');
    }catch(e) {
        next(e);
    }
};
module.exports = {
    login,
    register,
    list
}