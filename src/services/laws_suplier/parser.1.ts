import { ILawAttributes, LawStatus } from "../../db/model/Law";
import { isNumber } from "util";
import * as fs from 'fs'
import * as cheerio from 'cheerio'
import main from "../../configuration/main";

class LawParser{
    constructor(){

    }
    parseLawsInVoting (html):Array<ILawAttributes>{
        let $ = cheerio.load(html);
        var laws:Array<ILawAttributes>=[];
        console.log($('table').children().eq(1).children('tr').length);
        $('table').children().eq(1).children('tr').each(function(id:number,el:CheerioElement){
                var name:string,status:string;
                var textDIV:Cheerio =$(el).children().eq(1).children().eq(1);
                if(textDIV.children().eq(0).length){
                    if(textDIV.children().eq(0).attr('color')==="green"){
                        status=LawStatus.IN_PROCEDURE;
                    }else{
                        status=LawStatus.VOTED_REFUSED;
                    }
                    name=textDIV.children().eq(0).text()
                }else{
                    name=textDIV.text().replace(/\n/g,'');
                    status=LawStatus.VOTED_ACCEPTED;
                }
                var pdfLink:string=$(el).children().eq(1).children().eq(0).children().eq(0).attr('href');
                var govId:number = parseInt(pdfLink.slice(pdfLink.lastIndexOf("nr=")+3,pdfLink.length));
                laws.push({
                    name:name,
                    pdfLink:pdfLink,
                    cadence:main.law.cadence,
                    govId:govId,
                    status:status
                })
        })
        return laws;
    }
    parseLawsRefused(html):Array<ILawAttributes>{
        return html;
    }
    parseLawsAccepted(html):Array<ILawAttributes>{
       return html;
    }
    parsePDFLink(html):string{
        var links = html.match(/<a [^>]* href="(.*?\.pdf)"[^>]*>/i);
        if(links)
            return links[1];
        return "no-link"
    }
    empty(obj){
        return (!obj||Array.isArray(obj)&&obj.length===0);
    }
}

export const parser= new LawParser();




