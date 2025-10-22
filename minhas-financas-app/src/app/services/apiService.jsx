import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:8081'
})

class ApiService{
    constructor(apiurl) {
        this.apiurl = apiurl;
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