import * as kue from "kue"
import { Vote } from "./vote";

export class BlockChainCLient{
    queue:kue.Queue
    constructor(){
        this.queue=kue.createQueue();

    }
    addVote(vote:Vote){
        console.log("I am voting"+JSON.stringify(vote));
        return new Promise((resolve,reject)=>{
            var job =this.queue.create("addVote",{
                userToken:vote.userToken,
                lawHash:vote.lawHash,
                status:vote.status
            }).priority('high').save();

            job.on('complete', function(result){
                console.log("I voted success")
                resolve();
               
              }).on('failed', function(errorMessage){
                console.log("I voted fail")
                reject();
               
              });
        })
    }
    getPartOfChain(index:number){
        return new Promise((resolve,reject)=>{
            var job =this.queue.create("getPartOfChain",{
                index:index
            }).priority('low').save();

            job.on('complete', function(result){
                resolve(result);
               
              }).on('failed', function(errorMessage){
                reject(errorMessage);
               
              });
        })
    }
}

export const  blockChainCLient= new BlockChainCLient();