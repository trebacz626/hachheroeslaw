import { ILawAttributes, LawStatus } from "../../db/model/Law";
import { isNumber } from "util";
import * as fs from 'fs'

class LawParser{
    constructor(){

    }
    parseLawsInVoting (html):Array<ILawAttributes>{
        return html;
    }
    parseLawsRefused(html):Array<ILawAttributes>{
        return html;
    }
    parseLawsAccepted(html):Array<ILawAttributes>{
        var links = html.match(/(<a[^>]*?>pdf<\/a>)/g);
        var description = html.match(/<td class="left">(.*?)<\/td>/ig);
        var number = html.match(/title="Przebieg procesu legislacyjnego">(.*?)<\/a>/g);
        console.log(links.length);
        console.log(number.length);
        for (var m = 0; m < links.length; m++) {
            links[m] = links[m].match(/href="(.*?)"/);
        }
        for (var i = 0; i < description.length; i++) {
            description[i] = description[i].match(/<td[^>]*?>(.*?)</);
        }
        for (var n = 0; n < number.length; n++) {
            number[n] = number[n].match(/>([^<]*?)</);
        }
        for (var l = 0; l < links.length; l++) {
            links[l] = links[l][1];
        }
        for (var k = 0; k < description.length; k++) {
            if (this.empty(description[k][1])) description.splice(k, 1);
        }
        for (var z = 0; z < description.length; z++) {
            description[z] = description[z][1];
        }
        var nnn = function(num:string){
            if(num.indexOf(",")>=0){
                var splt=num.split(",");
                var arr=[];
                for(let x=0;x<splt.length;x++){
                    arr.push(parseInt(splt[x]));
                }
                return arr;
            }else{
                return parseInt(num);
            }
        }
        fs.writeFileSync("number.json",number.join("\n"));
        for (var s = 0; s < number.length; s++) {
            if(number[s][1]===undefined){
                console.log("undefined")
                console.log(number[s]);
                continue;
            }
            var num:Array<number>|number = nnn(number[s][1])
            if((<Array<number>>num).length){
                number[s]=num[0];
                for(let x=0;x<(<Array<number>>num).length;x++){
                    number.push(num[x]);
                    description.push(description[s]);
                    links.push(links[s]);
                }
            }else
                number[s] = parseInt(number[s][1]);
        }
        console.log(links.length);
        console.log(description.length);
        console.log(number.length);
        var laws:Array<ILawAttributes>=[];
        for(let x = 0;x<links.length;x++){
                laws.push({
                    govId:number[x],
                    pdfLink:links[x],
                    name:description[x],
                    status:LawStatus.IN_PROCEDURE
                })
        }
        //fs.writeFileSync("laws.json",laws.join("\n"));
        return laws;
    }
    parsePDFLink(html):string{
        var links = html.match(/<a [^>]* href="(.*?\.pdf)"[^>]*>/i);
        return links[1];
    }
    empty(obj){
        return (!obj||Array.isArray(obj)&&obj.length===0);
    }
}

export const parser= new LawParser();




