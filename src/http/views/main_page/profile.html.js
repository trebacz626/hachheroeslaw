var profile = `<div class="text-light bg-dark"><p>Twoje ustawy</p></div><div id="dynamicSideContent"></div>`;

class ProfileController {
    constructor() {
        this.template = profile;
    }
    async start() {
        await $("#content").html(this.template);
        await this.loadDataForList();
        this.isVoting=false;
    }

    async voteForLaw(id, isUp) {
        if (this.isVoting) return;
        this.isVoting = true;
        var res = await apiClient.voteForLaw(id, isUp);
        $('#law' + id).children().eq(1).children().eq(0).text("Za: " + res.law.votesUp);
        $('#law' + id).children().eq(1).children().eq(1).text("Przeciw: " + res.law.votesDown);
        this.isVoting = false;
    }

    async loadDataForList() {
        var laws = await apiClient.getUsersVotes();
        var currentLaw = [];
        for (var i = 0; i < laws.length; i++) {
            currentLaw[i] =
                `
                <div class='law bg-light' id='law${laws[i].id}'>
                    <div class="description-wrapper">
                     <a href="${laws[i].pdfLink}"><button  type="button" onclick="" class='btn btn-square btn-light'>${laws[i].name}</button></a>
                    </div>
                    <div class=" btn-group voteBlock">
                        <button  type="button" onclick="sejmcontroller.voteForLaw(${laws[i].id},true)" class='btn  btn-success btn-square'>Za: ${laws[i].votesUp}</button>
                        <button  type="button" onclick="sejmcontroller.voteForLaw(${laws[i].id},false)" class='btn btn-square btn-danger'>Przeciw: ${laws[i].votesDown}</button>
                    </div>
                </div>
                `;
            $("#dynamicSideContent").html($("#dynamicSideContent").html() + currentLaw[i])
        }
    }
}