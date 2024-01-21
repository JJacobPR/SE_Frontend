import axios from 'axios';
import LocalStorage from './LocalStorage';

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

    static fetchPosts = async (page = 1, per_page = 15, paginate = true, search = '', sort = '-created_at', user_uuid = '', withAuthor = true, withCommentCount = false) => {
        try {
            const response = await axios.get('/api/posts', { 
                withCredentials: true,
                params: {
                    page,
                    per_page,
                    paginate,
                    'filter[search]': search,
                    sort,
                    'filter[user_uuid]': user_uuid,
                    withAuthor,
                    withCommentCount
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching post data:', error);
            throw error;
        }
    }

    static fetchPost = async (uuid) => {
        try {
            const response = await axios.get(`/api/posts/${uuid}`, { withCredentials: true });
            console.log(response.data.data)
            return response.data.data;
        } catch (error) {
            console.error('Error fetching friend data:', error);
            throw error;
        }
    }

    static fetchUserWithoutFriends = async () => {
        try {
            const response = await axios.get('/api/users?filter[not_friend]=true&paginate=false', { withCredentials: true });
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching users data:', error);
            throw error;
        }
    }

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

    static addFriend = async (friend_uuid) => {
        try {
            const uuid = LocalStorage.GetActiveUser();
            const response = await axios.post(`/api/users/${uuid}/addFriend`, {
                friend_uuid: friend_uuid
            }, {
                withCredentials: true
            });
            return response.data.data;
        } catch (error) {
            console.error('Error adding friend:', error);
            throw error;
        }
    }

    static removeFriend = async (friend_uuid) => {
        try {
            const uuid = LocalStorage.GetActiveUser();
            const csrfToken = await this.fetchCsrfToken();
            const response = await axios.delete(`/api/users/${uuid}/removeFriend`, {
                data: { friend_uuid: friend_uuid },
                withCredentials: true,
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            console.log(`Friend with UUID: ${friend_uuid} removed successfully.`);
            return response.data;
        } catch (error) {
            console.error('Error removing friend:', error);
            throw error;
        }
    }
}

export default ApiHelper;
