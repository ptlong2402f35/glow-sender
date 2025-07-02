"use strict";
import util from "util";

import fs from "fs";
import path from "path";
import { Options, Sequelize, DataTypes } from "sequelize";
const basename = path.basename(__filename);
import Config from "../config/Config";
const dbConfig = Config.db;
const db = {} as any;

console.log(dbConfig);
let sequelize;

sequelize = new Sequelize(dbConfig.db || "", dbConfig.username || "", dbConfig.password, {
	...dbConfig,
	// logging: console.log,
} as Options);
// console.log(`==== sequelize detail: `, util.inspect(sequelize, false, null, true));

fs.readdirSync(__dirname)
	.filter((file: any) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach((file: any) => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
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
