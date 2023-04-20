import { IBackEndUser, IUser } from '@/app/Helper/Modules';

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


    public async loginUser(email: string, password: string)
    {

        return await fetch(this.enviroment+"/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email, password: password}),
            });
    }

}