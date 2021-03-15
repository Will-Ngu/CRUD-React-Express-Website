// import { request } from "../../api/app"


const api = {
    async getUsers() {
        let res = await fetch('/users')
        console.log(typeof(res))
        console.log(res)
        return res.json()
    },
    async getJha() {
        let res = await fetch('http://localhost:9000');

        console.log('wiw')

        return res.json();
    },
    async getJhaSteps(id) {
        const reqOptions = {
            method: 'GET',
        };
        // console.log("I am running thru here");
        // console.log(id);
        let res = await fetch('http://localhost:9000/steps/'+id, reqOptions);
        return res.json();
    },

    async getSpecficJha(id) {
        const reqOptions = {
            method: 'GET',
        };
        console.log(id)
        let res = await fetch('http://localhost:9000/'+id, reqOptions);
        // console.log(typeof(res));
        // console.log(res);
        return res.json();
    },

    async updateJha(id,data) {
        let requestOpt = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        };
        let res = await fetch('http://localhost:9000/'+id, requestOpt)
        // console.log(typeof(res));
        // console.log(res);
        return res;
    },

    async postJha(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        };

        let res = await fetch('http://localhost:9000', requestOptions);
        return res;
    },

    async deleteJha(id){
        let res = await fetch('http://localhost:9000/'+id, { method: 'DELETE' });
        console.log(res);
        return res;
    }
}

export default api