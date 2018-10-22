import { globalLawService } from "../../db/services/LawService";
import { ILawAttributes, ILawInstance, LawStatus } from "../../db/model/Law";
import {parser} from './parser.1'
import * as http from 'http'
import fetch from 'node-fetch'
import sequelizeManager from "../../db/model/sequelizeManager";

const DOMAIN = "http://www.sejm.gov.pl";
const ALL_LAWS_URL="http://www.sejm.gov.pl/sejm8.nsf/page.xsp/przeglad_projust";
const ACCEPTED_LAWS_URL="http://www.sejm.gov.pl/sejm8.nsf/agent.xsp?symbol=USTAWYALL&NrKadencji=8&NrPosiedzenia=999999";
const REFUSED_LAWS_URL="http://orka.sejm.gov.pl/proc8.nsf/0/DA846873159772A7C1257F180052F231?Open";

async function makeRequest(url:String):Promise<string>{
    return await (await fetch(url)).text()
}

function compareLaws(one,two){
    return one.status===two.status&&one.pdfLink===two.pdfLink&&one.name===two.name;
}
function passLawData(dbLaw,pageLaw){
    dbLaw.status=pageLaw.status;
    dbLaw.pdfLink=pageLaw.pdfLink;
    dbLaw.name=pageLaw.name;
}

export class Suplier{
    constructor(){

    }    
    async start(){
        await sequelizeManager.prepare();
        await sequelizeManager.connect();
        await this.updateLaws();
        setInterval(this.updateLaws,1000*60*60*12);
    }
    async updateLaws(){
        console.log("UPDATING LAWS");
        var govPageLaws:Array<ILawAttributes> = await this.getLawsFromGovPage();
        var currentLaws:Array<ILawInstance> = await globalLawService.getAllLaws();
        var lawsToUpdate:Array<ILawInstance>=[];
        var lawsToCreate:Array<ILawAttributes>=[];
        var currentLawsByGovId={};
        let l=currentLaws.length;
        for(let i=0;i<l;i++){
            currentLawsByGovId[currentLaws[i].govId]=currentLaws[i];
        }
        l = govPageLaws.length;
        for( let i=0;i<l;i++){
            if(currentLawsByGovId[govPageLaws[i].govId]){
                if(!compareLaws(currentLawsByGovId[govPageLaws[i].govId],govPageLaws[i])){
                    passLawData(currentLawsByGovId[govPageLaws[i].govId],govPageLaws[i]);
                    lawsToUpdate.push(currentLawsByGovId[govPageLaws[i].govId]);
                }
            }else{
                console.log("create laws");
                lawsToCreate.push(govPageLaws[i]);
            }
        }
        await globalLawService.bulkCreateLaws(lawsToCreate);
        await globalLawService.bulkUpdateLaws(lawsToUpdate);
    }
    async getPDFLinksForLaws(laws:Array<ILawAttributes>){
        var requestsToresolve=[];
        for(let i=0;i<laws.length;i+=100){
            var requestsToresolve=[];
            var tempsLaws = laws.slice(i,i+100);
            tempsLaws.forEach(function(law:ILawAttributes){
                requestsToresolve.push((async function(){
                    law.pdfLink = await parser.parsePDFLink(await makeRequest(DOMAIN+law.pdfLink));            
                })());
            })
            await Promise.all(requestsToresolve);
        }
    }
    async getLawsFromGovPage(){
        var allLawsToUpdate:Array<ILawAttributes>  = parser.parseLawsInVoting(await makeRequest(ALL_LAWS_URL));
        console.log(allLawsToUpdate.length);
        await this.getPDFLinksForLaws(allLawsToUpdate)
        console.log(allLawsToUpdate);
        return allLawsToUpdate;
    }
}



