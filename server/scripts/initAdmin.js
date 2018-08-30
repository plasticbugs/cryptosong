const db = require("../../db-config");
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

const password = 'florida';

const salt = bcrypt.genSaltSync(10);
const hashWord = bcrypt.hashSync(password, salt);

initAdmin = {
    username: 'admin',
    password: hashWord,
    email: 'down@someold.spot'
};

Admin
    .create(initAdmin)
    .then((instance) => {
    console.log('new admin created:')
    console.log(instance);
    console.log({
        status: `New Admin "${instance.username}" Created!`
    });
    process.exit();
    })
    .catch(err => {
        console.dir(err);
        process.exit();
    });


