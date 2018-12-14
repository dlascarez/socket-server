import Server from "./clases/server";
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

// Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// Enable CORS
server.app.use(cors({ origin: true, credentials: true }));

// Routes
server.app.use('/', router );

// Start server
server.start(() => {
    console.log(`Server corriendo en el puerto: ${ server.port }`);
});