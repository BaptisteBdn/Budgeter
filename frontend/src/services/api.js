import axios from 'axios'
import authHeader from './auth-header';

export default () => {
    return axios.create(
        {
            baseURL: process.env.VUE_APP_API_URL || "http://localhost:8081",
            headers: authHeader()
        }
    )
}