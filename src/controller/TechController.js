const Tech = require('../model/Tech');
const User = require('../model/User');

const store = async (req, resp) => {
    const { user_id } = req.params;
    const { name } = req.body;

    const userDB = await User.findByPk(user_id);

    if(!userDB) return resp.status(401).send('Usuário não encontrado.');

    const [ tech ] = await Tech.findOrCreate({
        where: { name }
    });

    await userDB.addTech(tech);

    return resp.json(tech);
}

const getAll = async (req, resp) => {
    const { user_id } = req.params;

    const userDB = await User.findByPk(user_id, {
        include: {
            association: 'techs',
            attributes: ['name'],
            through: {
                attributes: ['user_id']
            }
        }
    });

    resp.json(userDB.techs);

}

const remove = async ( req, resp) => {
    const { user_id } = req.params;
    const { name } = req.body;

    const userDB = await User.findByPk(user_id);

    if(!userDB) return resp.status(401).send('Usuário não encontrado.');

    const tech = await Tech.findOne({
        where: { name }
    });

    await userDB.removeTech(tech);

    return resp.json();
}

module.exports = {
    store,
    getAll,
    remove
}