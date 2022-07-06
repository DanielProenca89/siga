import { apiGetUser } from "./api";

export class Session{

    constructor(data){
        this.response = ""
        this.data = data;
        this.name = null;
        this.email = null;
        this.id = null;
        this.ticket = null;
    }


    /**
     * @param {string} data
     */
    async set(){


        this.response = await apiGetUser.post(`http://localhost:8080/api/client`,{data:this.data});
        this.name = this.response.nome;
        this.email = this.response.email;
        this.id = this.response.id;
        this.ticket = this.response.ticket;
    }

    async get(){
       return  this.response
    }

}