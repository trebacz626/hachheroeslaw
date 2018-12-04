export class Vote{
    userToken:string
    lawHash:string
    status:number//-1,0,1
    constructor(userToken:string,lawHash,status:number){
        this.userToken=userToken;
        this.lawHash=lawHash;
        this.status=status;

	

    }
}