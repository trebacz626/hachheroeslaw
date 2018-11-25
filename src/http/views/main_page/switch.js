var sejmcontroller = new SejmController()
var authController = new AuthController()

const changepage = async function (pagename) {
    switch (pagename) {
        case "logsite":
            await $("#content").html(logpage)
            authController.start();
            break;
        case "mojsejm":
            await $("#content").html(mojsejm)
            await sejmcontroller.start();
            break;
        case "cos":
            await $("#content").html(cos)
            break;
    }
}