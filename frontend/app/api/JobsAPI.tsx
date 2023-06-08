import { IJob } from "../Helper/Modules";

export class JobsAPI {
    private enviroment = "http://localhost:6032/api/Job";
    
    public async getJobs(UiD: number){
        const response = await fetch(this.enviroment + "/" +  UiD.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }

    public async postJob(job: IJob){
        const response = await fetch(this.enviroment, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        });
        const data = await response.json();
        return data;
    }

    public async updateJob(job: IJob){
        const response = await fetch(this.enviroment, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        });
        const data = await response.json();
        return data;
    }

    public async deleteJob(job: IJob){
        const response = await fetch(this.enviroment, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job),
        });
        const data = await response.json();
        return data;
    }


}