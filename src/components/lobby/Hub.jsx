import ServerConnection from './ServerConnection';
import ApiHelper from "../../helpers/ApiHelper.jsx";

class Hub {
  constructor() {
  }
  async chooseGame() {
    const service = new ApiHelper();
    const serverConnection = new ServerConnection(service); // Create a ServerConnection with the service
    //serverConnection.csrfToken = await ApiService.getCsrfToken();
    // serverConnection.createGameLobby(gameId);
    return serverConnection;
  }
}

export default Hub;
