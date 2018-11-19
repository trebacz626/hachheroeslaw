class APIClient {
    constructor() {

    }
    
    async getLawsByPage(page, status) {
        return [
            {
                "id": 2,
                "govId": 283,
                "name": "udh",
                "pdfLink": "dhh",
                "votesUp": 0,
                "votesDown": 0,
                "status": "inprogress",
                "usersVote": 0
            },
            {
                "id": 1,
                "govId": 1,
                "name": "name",
                "pdfLink": "href",
                "votesUp": 1,
                "votesDown": 0,
                "status": "inprogress",
                "usersVote": 1
            }
        ]
    }
}

var apiClient = new APIClient();