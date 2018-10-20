import { globalLawService } from "../../db/services/LawService";
import { ILawAttributes, ILawInstance, LawStatus } from "../../db/model/Law";
import {parser,LawToGather} from './parser'
import * as http from 'http'
import fetch from 'node-fetch'
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

class Suplier{
    constructor(){

    }    
    start(){

    }
    async updateLaws(){
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
                lawsToCreate.push(govPageLaws[i]);
            }
        }
        await globalLawService.bulkCreateLaws(lawsToCreate);
        await globalLawService.bulkUpdateLaws(lawsToUpdate);
    }
    async getPDFLinksForLaws(laws:Array<ILawAttributes>){
        var requestsToresolve=[];
        laws.forEach(function(law){
            requestsToresolve.push((async function(){
                if(law.status===LawStatus.IN_PROCEDURE)
                    law.pdfLink = await parser.parsePDFLink(await makeRequest(law.pdfLink));
            })())
        })
        await Promise.all(requestsToresolve);
    }
    async getLawsFromGovPage(){
        var allLawsToUpdate:Array<ILawAttributes>  = parser.parseLawsInVoting(await http.get(ALL_LAWS_URL))
        var acceptedLaws:Array<ILawAttributes> = parser.parseLawsAccepted(await http.get(ACCEPTED_LAWS_URL));
        var refusedLaws:Array<ILawAttributes> = parser.parseLawsRefused(await http.get(REFUSED_LAWS_URL));
        let l=allLawsToUpdate.length;
        var currentLawsByGovId={};
        for(let i=0;i<l;i++){
            currentLawsByGovId[allLawsToUpdate[i].govId]=allLawsToUpdate[i];
        }
        l =acceptedLaws.length;
        for(let i=0;i<l;i++){
            if(currentLawsByGovId[acceptedLaws[i].govId])
            currentLawsByGovId[acceptedLaws[i].govId]=acceptedLaws[i];
        }
        l =refusedLaws.length;
        for(let i=0;i<l;i++){
            if(currentLawsByGovId[refusedLaws[i].govId])
            currentLawsByGovId[refusedLaws[i].govId].status=refusedLaws[i].status;
        }
        var lawsToReturn:Array<ILawAttributes> = Object.values(currentLawsByGovId)
        this.getPDFLinksForLaws(lawsToReturn)
        return lawsToReturn;
    }
}

    /*async deliveryCoroutine(){
        var currentLaws:Array<ILawInstance> = await globalLawService.getAllLaws();
        var allLawsToUpdate = lawParser.parseLawsInVoting(await http.get(ALL_LAWS_URL));
        var acceptedLaws = lawParser.parseLawsAccepted(await http.get(ACCEPTED_LAWS_URL));
        var refusedLaws = lawParser.parseLawsRefused(await http.get(REFUSED_LAWS_URL));
        let l=currentLaws.length;
        var currentLawsByGovId={};
        for(let i=0;i<l;i++){
            currentLawsByGovId[currentLaws[i].gowId]=currentLaws[i];
        }
        l=allLawsToUpdate.length;
        for(let i=0;i<l;i++){
            if(!currentLawsByGovId[allLawsToUpdate[i].gowId]){
                currentLawsByGovId[allLawsToUpdate[i].gowId]=allLawsToUpdate[i];
            }
        }
        l = acceptedLaws.length;
        for(let i=0;i<l;i++){
            if(currentLawsByGovId[acceptedLaws[i].gowId]){
                currentLawsByGovId[acceptedLaws[i].gowId].status=acceptedLaws[i].status
            }else{
                currentLawsByGovId[acceptedLaws[i].gowId]=acceptedLaws[i];
            }
        }
        l = refusedLaws.length;
        for(let i=0;i<l;i++){
            if(currentLawsByGovId[refusedLaws[i].gowId]){
                currentLawsByGovId[refusedLaws[i].gowId].status=refusedLaws[i].status
            }else{
                currentLawsByGovId[refusedLaws[i].gowId]=refusedLaws[i];
            }
        }
        var finalArray:Array<ILawInstance> = Object.values(currentLawsByGovId);

    }*/


