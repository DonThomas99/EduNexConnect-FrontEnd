import { SocketIoConfig } from "ngx-socket-io";
import { environments } from "src/environments/environment";
const config: SocketIoConfig = {
    url:  environments.backendURL, options: {}
};

export { config };