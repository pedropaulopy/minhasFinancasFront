import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

export const httpClient = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

class ApiService{
    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    static registrarToken(token){
        if(token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    post(url, objeto){
        return httpClient.post(`${this.apiurl}${url}`, objeto);
    }

    put(url, objeto){
        return httpClient.put(`${this.apiurl}${url}`, objeto);
    }

    delete(url, objeto){
        return httpClient.delete(`${this.apiurl}${url}`, objeto);
    }

    get(url, objeto){
        return httpClient.get(`${this.apiurl}${url}`, objeto);
    }
}

export default ApiService;