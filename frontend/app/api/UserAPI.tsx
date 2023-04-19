import { IBackEndUser, IUser } from '@/app/Helper/Modules';

export class UserAPI {

    private enviroment = "http://localhost:5001/api/User";

    public async registerUser(user:IBackEndUser){
        return await fetch(this.enviroment + "/register", {
            method: "POST",
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
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email, password: password}),
            });
    }

}