const bcrypt = require("bcryptjs");

exports.seed = (knex) => {
    return knex("users")
        .del()
        .then(() => {
            return knex("users").insert([
                {
                    username: "letanque",
                    password: bcrypt.hashSync(process.env.SECRET_PASSWORD, 5),
                    admin: true,
                },
            ]);
        });
};
