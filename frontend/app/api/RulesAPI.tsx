import { IRule } from "../Helper/Modules";

export class RulesAPI
{
    private enviroment = "http://localhost:6032/api/Rules";

    public async getRules(UiD: number) {
        const response = await fetch(`${this.enviroment}/${UiD}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }

    public async postRule(rule: IRule){
        console.log(rule);
        const response = await fetch(this.enviroment, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rule),
        });
        const data = await response.json();
        return data;
    }

    public async updateRule(rule: IRule){
        const response = await fetch(this.enviroment, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rule),
        });
    }

    public async deleteRule(rule: IRule){
        const response = await fetch(this.enviroment, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rule),
        });
        const data = await response.json();
        return data;
    }

}