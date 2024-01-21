import ApiHelper from "../../helpers/ApiHelper.jsx";
import PlayerLobby from "./PlayerLobby"; // Import the ApiService you created earlier

class ServerConnection {
  constructor() {
    this.Lobbies = [];
    this.csrfToken = "";
  };

  async createLobby(level) {
    const response = await ApiHelper.createGame(this.csrfToken, 4, level);
    const split = response.split('"uuid": "');
    const gameUUID = split[1].split('"');

    const lobby = new PlayerLobby(level, gameUUID, this);
    this.Lobbies.push(lobby);
    return lobby;
  };

  async addPlayer(gameUUID, joinerUUID) {
    return await ApiHelper.addUserToLobby(this.csrfToken, gameUUID, joinerUUID);
  };

  async getLobbyAmount() {
    return this.Lobbies.length;
  };
  async getLobby(num) {
    return this.Lobbies[num];
  };

  async getLoggedUser() {
    const response = await ApiHelper.fetchLoggedUser()
    let split = response.split('uuid:" "');
    const playerUUID = split[1].split('"');
    split = response.split('name:" "');
    const playerName = split[1].split('"');
    return [playerUUID[0], playerName[0]];
  };

  async getUser(userUUID) {
    const response = await ApiHelper.fetchUserByUUID(userUUID)
    let split = response.split('uuid:" "');
    const playerUUID = split[1].split('"');
    split = response.split('name:" "');
    const playerName = split[1].split('"');
    return [playerUUID[0], playerName[0]];
  };

  async updateLobby(stage, points, gameUUID) {
    if(stage == null) {
      const response = await ApiHelper.updateLobbyPoints(this.csrfToken, gameUUID, points);
      return response;
    } else {
      const response = await ApiHelper.updateLobbyStage(this.csrfToken, gameUUID, stage);
      return response;
    }
  };

  async destroyPlayerLobby(gameUUID) {
    const response = await ApiHelper.destroyGame(this.csrfToken, gameUUID);
    for(let i = 0; i < this.Lobbies.length; i++) {
      if(this.Lobbies[i][1] === gameUUID) {
        this.Lobbies.splice(i, 1);
        i = this.Lobbies.length + 10;
      }
    }
    return response;
  };
}

export default ServerConnection;
