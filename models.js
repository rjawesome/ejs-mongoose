"use strict";
exports.__esModule = true;
exports.stuffs = void 0;
var mongoose_1 = require("mongoose");
console.log(process.env.MONGODB_URL);
var databaseUrl = process.env.MONGODB_URL;
mongoose_1["default"].connect(databaseUrl, { useNewUrlParser: true });
var StuffSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});
var stuffs = mongoose_1["default"].model('stuffs', StuffSchema);
exports.stuffs = stuffs;
