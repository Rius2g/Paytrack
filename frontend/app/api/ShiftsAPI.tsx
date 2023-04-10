import axios from "axios";

export class ShiftsAPI 
{
    private enviroment = "http://localhost:5022/api/Shift";

    public async getShifts() {
        const response = await axios.get(this.enviroment);
        return response.data;
    }


    public async getShift(id: number) {
        const response = await axios.get(this.enviroment + "/" + id);
        return response.data;
    }

    public async createShift(shift: any) {
        const response = await axios.post(this.enviroment, shift);
        return response.data;
    }
    
    public async getShiftsInRange(dateStart: number, dateEnd:number, UiD:number)
    {
        const response = await fetch(this.enviroment+UiD.toString()+"?dateStart="+dateStart.toString()+"&dateEnd="+dateEnd.toString(),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }

    public async updateShift(shift: any) {
        const response = await axios.put(this.enviroment, shift);
        return response.data;
    }

}