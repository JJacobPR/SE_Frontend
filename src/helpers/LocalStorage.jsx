class LocalStorage {
    
    static IsUserLogged() {
        return localStorage.getItem('userUuid') != null;
    }

    static GetActiveUser() {
        let validUntil = new Date(parseInt(localStorage.getItem('authValidUntil'), 10));
        let now = Date.now();
        
        if (validUntil - now < 0) {
            LocalStorage.LogoutUser();
            window.location.href = '/login'; return;
        }

        if (!LocalStorage.IsUserLogged()) {
            LocalStorage.LogoutUser();
            window.location.href = '/login'; return;
        }

        return localStorage.getItem('userUuid');
    }

    static SetActiveUser(userUuid) {
        localStorage.setItem('userUuid', userUuid);
        localStorage.setItem('authValidUntil', Date.now() + (2 * 60 * 60 * 1000));
    }

    static LogoutUser() {
        localStorage.removeItem("userUuid");
        localStorage.removeItem("authValidUntil");
    }

    static SetChatHistory(friendUuid, messages) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
        chatHistory[friendUuid] = messages;
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
      }
    
      static GetChatHistory(friendUuid) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || {};
        return chatHistory[friendUuid] || [];
      }

}

export default LocalStorage;