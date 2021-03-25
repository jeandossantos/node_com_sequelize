const User = require('../model/User');

const store = async (req, resp) => {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    return resp.status(201).json(user);
}

const getAll = async (req, resp) => {
    const users = await User.findAll();

    resp.json(users);
}

module.exports = {
    store,
    getAll
}