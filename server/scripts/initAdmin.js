const db = require("../../db-config");
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const Log = require('../logger.js');

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
    Log.info('new admin created:')
    Log.info(instance);
    Log.info(`New Admin "${instance.username}" Created!`);
    process.exit();
    })
    .catch(err => {
        Log.error(err);
        process.exit();
    });


