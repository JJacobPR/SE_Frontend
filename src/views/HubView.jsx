import RedirectionHelper from "../helpers/RedirectionHelper";
import React, {useEffect, useState} from "react";
import LocalStorage from "../helpers/LocalStorage";
import LeftSidebar from "../components/left_sidebar/LeftSidebar";
import ApiHelper from "../helpers/ApiHelper.jsx";
import {useNavigate} from "react-router-dom";
import Hub from "../components/lobby/Hub.jsx";
import ServerConnection from "../components/lobby/ServerConnection.jsx";

const HubView = (props) => {
    const navigate = useNavigate();
    const initialLobbyValue = [{
        uuid: "",
        limit: 0,
        level: 1,
        stage: 0,
        goal: 0,
        created_at: "",
        updated_at: "",
    }];
    const initialPlayerValue = [{
        uuid: "",
        name: "",
        email: "",
        lobby_host: 0, // 1 - host
    }]
    const [lobby, setLobby] = useState(initialLobbyValue);
    const [players, setPlayers] = useState([]);
    const hub = new Hub();

  useEffect(() => {
    if (!LocalStorage.IsUserLogged()) {
      RedirectionHelper.Redirect("/login");
    }
  });

    const handleCreateLobby = async () => {
        const result = await ApiHelper.createGame(4,1);
        const result2 = await ApiHelper.fetchLoggedUser();
        console.log(result);
        console.log(result2);
        setLobby(await result);
        setPlayers(players => [{uuid: result2.uuid, name: result2.name, email: result2.email, lobby_host: 1}]);
        console.log("Game created");
    }

    const handleAddPlayer = async (joinerUUID) => {
        if(lobby.uuid != "" && players.length <= lobby.limit){
            joinerUUID = "730fa869-f7b1-444b-8bca-ff11953f1c75";  //temp value
            const result = await ApiHelper.addUserToLobby(lobby.uuid, joinerUUID);
            const result2 = await ApiHelper.fetchUserByUUID(joinerUUID);
            console.log(result);
            console.log(result2);
            setPlayers(players => [ ...players, {
                uuid: result2.uuid,
                name: result2.name,
                email: result2.email,
                lobby_host: 0
            }]);
            console.log(`Player ${joinerUUID} added`);
        } else console.log(`Player ${joinerUUID} couldn't be added`);
    }

    const handleAddPlayer1 = async (joinerUUID) => {
        if(lobby.uuid != "" && players.length <= lobby.limit){
            joinerUUID = "53584727-b5f6-455f-93e6-79c6b4f101ce"; //temp value
            const result = await ApiHelper.addUserToLobby(lobby.uuid, joinerUUID);
            const result2 = await ApiHelper.fetchUserByUUID(joinerUUID);
            console.log(result);
            console.log(result2);
            console.log(`Player ${joinerUUID} added`);
            setPlayers([...players, {
                uuid: result2.uuid,
                name: result2.name,
                email: result2.email,
                lobby_host: 0
            }]);
        } else console.log(`Player ${joinerUUID} couldn't be added`);
    }

    const startGame = async () => {
        if(lobby.uuid != ""){
            console.log(players);
            const result = await ApiHelper.updateLobbyStage(lobby.uuid, 2);
            console.log("Game started");
            //give player to games components
        }
    }

    const deleteGame = async () => {
        const response = await ApiHelper.destroyGame(lobby.uuid);
        setPlayers(initialPlayerValue);
        setLobby(initialLobbyValue);
        console.log("Game deleted");
    }

  return (
    <div style={{ display: "flex" }}>
      <LeftSidebar />
      <div style={{ flex: 1 }}>
          <button onClick={handleCreateLobby}>Create Lobby Game 1</button>
          <button onClick={handleAddPlayer}>Add Player 1</button>
          <button onClick={handleAddPlayer1}>Add Player 2</button>
          <button onClick={startGame}>Start Game</button>
          <button onClick={deleteGame}>Delete Game</button>
        {/* Rest of the hub content */}
      </div>
    </div>
  );
};

export default HubView;
