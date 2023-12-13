export class PayAPI  {
    private enviroment = "http://localhost:6032/api/Pay";


    public async getPay(UiD: number, start:number, end:number){
        if(UiD == 0 || start == null || end == null){
            return null;
        }
        const response = await fetch(this.enviroment + "?" +  new URLSearchParams({
            UiD: UiD.toString(),
            start: start.toString(),
            end: end.toString()
        }),
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }
}   