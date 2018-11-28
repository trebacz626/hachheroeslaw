class AuthController {
    constructor() {
        this.template = logpage;
    }
    async start() {
        
        await $("#content").html(logpage)
        if(dataStorage.getRefreshToken()){
            this.showProfile();
            
        }else{
            this.showLoginForm();
        }
    }
    async register(form)
    {
        apiClient.Register(form.email.value, form.name.value, form.password.value)
        return false;
    }
    async logIn(form)
    {
        apiClient.Login(form.email.value, form.password.value)
        return false;
    }
    async logout(){
        dataStorage.unsetUser();
        this.showLoginForm()
    }
    async showProfile(){
        $("#profile").show();
        $("#logsite").hide();
    }
    async showLoginForm(){
        $("#logsite").show();
        $("#profile").hide();
    }
}