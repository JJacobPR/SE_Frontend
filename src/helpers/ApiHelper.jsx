import axios from 'axios';

class ApiHelper {

    static getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    static fetchCsrfToken = async () => {
        try {
            await axios.get('/api/csrf-cookie', { withCredentials: true });
            const csrfToken = this.getCookie('XSRF-TOKEN');
            return csrfToken;
        } catch (error) {
            console.error('Error retrieving CSRF cookie:', error);
            throw error;
        }
    };

    static fetchLoggedUserWithFriends = async () => {
        try {
            const response = await axios.get('/api/user?withFriends=true', { withCredentials: true });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    static fetchFriendData = async (uuid) => {
        try {
            const response = await axios.get(`/api/users/${uuid}`, { withCredentials: true });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching friend data:', error);
            throw error;
        }
    }

    static fetchLoggedUser = async () => {
        try {
            const response = await axios.get('/api/user', { withCredentials: true });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
}

export default ApiHelper;
