var mojsejm = `<div id="dynamicSideContent"></div>`;

class SejmController {
    constructor() {
        this.template = mojsejm;
    }
    async start() {
        await this.loadDataForList();
        this.isVoting = false;
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
        var laws = await apiClient.getLawsByPageAndStatus(1, "inprogress");
        var currentLaw = [];
        for (var i = 0; i < laws.length; i++) {
            currentLaw[i] =
                `
                <div class='law' id='law${laws[i].id}'>
                    <div class="description-wrapper">
                     <a href="${laws[i].pdfLink}"><button onclick="" class='btn btn-light  '>${laws[i].name}</button></a>
                    </div>
                    <div class=" btn-group voteBlock">
                        <button onclick="sejmcontroller.voteForLaw(${laws[i].id},true)" class='btn btn-success'>Za: ${laws[i].votesUp}</button>
                        <button onclick="sejmcontroller.voteForLaw(${laws[i].id},false)" class='btn btn-danger'>Przeciw: ${laws[i].votesDown}</button>
                    </div>
                </div>
                `;
            $("#dynamicSideContent").html($("#dynamicSideContent").html() + currentLaw[i])
        }
    }
}


