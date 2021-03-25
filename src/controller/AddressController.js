const Address = require('../model/Address');
const User = require('../model/User');

const store = async (req, resp) => {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;
    
    const userDB = await User.findByPk(user_id);

    if(!userDB) return resp.status(400).send('Usuário não encontrado!');

    const address = await Address.create({
        user_id,
        zipcode,
        street,
        number
    });

    return resp.json(address);
}

const getAll = async (req, resp) => {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
        include: { association: 'addresses' }
    })

    return resp.json(user.addresses);
}

module.exports = {
    store,
    getAll
}