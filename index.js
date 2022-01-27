"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = require('./routes/index');
const db = require('./models');
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_2 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express_2.default.json());
app.use(express_2.default.static(path_1.default.resolve(__dirname, 'static')));
app.use((0, express_fileupload_1.default)({}));
app.use(express_2.default.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express_2.default.static(__dirname + '/public'));
app.use('/api', router);
app.get('/', (req, res) => {
    res.render('index', { title: 'Inventory' });
});
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/public/', 'index.html'));
});
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`);
    });
});
//# sourceMappingURL=index.js.map