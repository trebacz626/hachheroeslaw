var sejmcontroller = new SejmController()
var authController = new AuthController()
var profileController = new ProfileController();

const changepage = async function (pagename) {
    switch (pagename) {
        case "regsite":
        case "logsite":
            authController.start(pagename);
            break;
        case "mojsejm":
            await $("#content").html(mojsejm)
            await sejmcontroller.start();
            break;
        case "cos":
            await $("#content").html(cos)
            break;
        case "profile":
            profileController.start();
            break;
    }
}