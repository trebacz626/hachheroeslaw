class LawParser{
    constructor(){

    }
    parseLawsInVoting (content):Array<LawToGather>{
        return content;
    }
    parseLawsRefused(content):Array<LawToGather>{
        return content;
    }
    parseLawsAccepted(content):Array<LawToGather>{
        return content;
    }
    parsePDFLink(content):string{
        return content;
    }
}

export const parser= new LawParser();


export class LawToGather{
    govId:number
    name:string
    status:string
    pdfLink:string
    constructor(govId,name){
        this.govId=govId;
        this.name=name;
        this.pdfLink=this.pdfLink
    }
    
}



