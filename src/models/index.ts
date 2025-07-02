"use strict";
require("dotenv").config();
const util = require("util");

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {} as any;

console.log(config);
let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, {
	...config,
	// logging: console.log,
});
// console.log(`==== sequelize detail: `, util.inspect(sequelize, false, null, true));

fs.readdirSync(__dirname)
	.filter((file: any) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach((file: any) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model?.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
