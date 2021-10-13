import axios from 'axios'
const setAuthToken = (token: string) => {
    if ( token ) {
        return axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
export default setAuthToken;