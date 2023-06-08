import { IBackEndUser } from '@/app/Helper/Modules';

export class UserAPI {

    private enviroment = "http://localhost:6032/api/User";

    public async registerUser(user:IBackEndUser){
        return await fetch(this.enviroment + "/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }


    public async loginUser(user:IBackEndUser)
    {
        return await fetch(this.enviroment+"/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
    }

    public async changeSettings(uid:number, taxRate: number, currency: string)
    {
        return await fetch(this.enviroment + "/" + uid.toString() + "?TaxRate=" + taxRate.toString() + "?=Currency" + currency, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                },
            });
    }

    public async getUser(uid:number)
    {
        const response = await fetch(this.enviroment + "/" + uid.toString(), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                },
            });
        const data = await response.json();
        return data;
        
    }

}