import dotenv from 'dotenv';
import express, { Response, Request } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes/index';
import db from './models';
import cors from 'cors';
import fileUpload from 'express-fileupload';

dotenv.config();
const app = express();

const PORT  = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
routes(app)

app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'Inventory' })
});
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/public/', 'index.html'))
});

db.sequelize.sync()
.then(() => {
  app.listen(PORT, ():void => {
    console.log(`listening on http://localhost:${PORT}`)
  });
})

