var logpage = `
<div class="login-box">
    <form onsubmit="authController.logIn(this);return false;" id="logblock">
        <h1 class="kolor">Logowanie</h1>

        <div class = "textbox">
        <i class="fas fa-user" aria-hidden="true"></i>
        <input type="email" class="form-control" placeholder="Wpisz email" name="email"  required>
        </div>

        <div class = "textbox">
        <i class="fas fa-lock" aria-hidden="true"></i>
        <input type="password" class="form-control" placeholder="Wpisz hasło" name="password"  required>
        </div>

        <button class="btnl" type="submit" name="" >Zaloguj</button>
        <span id="error" style="color:white">  </span>
    </form>
</div>
`;

var regpage = `
<div class="login-box">
    <form onsubmit="authController.register(this);return false;" id="logblock">
        <h1 class="kolor">Rejestracja</h1>

        <div class = "textbox">
        <i class="fas fa-user" aria-hidden="true"></i>
        <input type="email" class="form-control" placeholder="Wpisz email" name="email"  required>
        </div>

        <div class = "textbox">
        <i class="fas fa-lock" aria-hidden="true"></i>
        <input type="name" class="form-control" placeholder="Nazwa użytkownika" name="name"  required>
        </div>

        <div class = "textbox">
        <i class="fas fa-lock" aria-hidden="true"></i>
        <input type="password" class="form-control" placeholder="Wpisz hasło" name="password"  required>
        </div>

        <button class="btnl" type="submit" name="" >Zarejestruj</button>
        <span id="error" style="color:white">  </span>
    </form>
</div>

`;
class AuthController {
    constructor() {
    }
    async start(pagename) {
        switch (pagename) {
            case "regsite":
                await $("#content").html(regpage);
                break;
            case "logsite":
                await $("#content").html(logpage);
                break;
        }
    }
    async register(form)
    {
        console.log("beforeReg");
        try{
        var wynik =await apiClient.Register(form.email.value, form.name.value, form.password.value);
        }catch(err){
            wynik=JSON.parse(err.responseText);
        }
        
        if(wynik.error)
        {
            var blad = document.getElementById("error");
            console.log(wynik.error);
            blad.innerHTML=wynik.error.message;
        }
        else
        {
            this.pokaz();
            changepage('mojsejm');
        }
        return false;
    }
    async logIn(form)
    {
        try{
            var wynik;
            wynik=await apiClient.Login(form.email.value, form.password.value)
        }catch(err){
            wynik=JSON.parse(err.responseText);
        }
        
        if(wynik&&wynik.error)
        {
            var blad = document.getElementById("error");
            console.log(wynik.error);
            blad.innerHTML=wynik.error.message;
        }
        else
        {
            this.pokaz();
            changepage('mojsejm');
        }
        return false;
    }
    async logout(){
        dataStorage.unsetUser();
        this.pokaz();
        this.start("logsite");
    }
    async pokaz(){
        if(dataStorage.getUser()){
            $("#prelog").hide();
            $('#postlog').show()
        }else{
            $("#prelog").show();
            $('#postlog').hide()
        }
    }
}