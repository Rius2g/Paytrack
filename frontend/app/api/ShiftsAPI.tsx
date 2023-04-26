import { IShift } from "../Helper/Modules";

export class ShiftsAPI 
{
    private enviroment = "http://localhost:6032/api/Shift";

    public async getShifts() {
        const response = await fetch(this.enviroment, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }


    public async getShift(id: number) {
        const response = await fetch(this.enviroment + "/" + id.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }

    public async createShift(shift: IShift) {
        const response = await fetch(this.enviroment, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(shift),
            });
            const data = await response.json();
            return data;
    }
    
    public async getShiftsInRange(dateStart: number, dateEnd:number, UiD:number)
    {
        const response = await fetch(this.enviroment+"/weekly/"+ UiD.toString()+"?dateStart="+dateStart.toString()+"&dateEnd="+dateEnd.toString(),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }

    public async updateShift(shift: IShift) {
        const response = await fetch(this.enviroment + "/" + shift.shiftID.toString(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(shift),
            });
            const data = await response.json();
            return data;
    }

    public async deleteShift(shiftID:number, uid:number) {
        const response = await fetch(this.enviroment + "?id=" + shiftID.toString() + "&uID=" + uid.toString(), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data;
    }

}