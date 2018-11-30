var logpage = `
<div class="reg">
    <form onsubmit="authController.logIn(this);return false;" id="logblock">
        <div class="container">
                <label for='email' name:"email"> <b>E-mail</b></label><br>
                <input type="email" placeholder="Wpisz email" name="email"  required>
                <br>
                <label for='password' name="password"><b>Hasło</b></label><br>
                <input type="password" placeholder="Wpisz hasło" name="password"  required>
                <br>
                <button type="submit" name='login'>Zaloguj się</button>
        </div>
    </form>
</div>
`;
var regpage = `
<div >  
    <form onsubmit="authController.register(this);return false;" id="regblock">
            <div class="container" >
                <label for='email' name:"email"> <b>E-mail</b></label><br>
                <input type="email" placeholder="Wpisz email" name="email"  required>
                <br>
                <label for='name'> <b>Nazwa użytkownika</b></label><br>
                <input type="name" placeholder="Wpisz nazwę użytkownika" name="name"  required>
                <br>
                <label for='password' name="password"><b>Hasło</b></label><br>
                <input type="password" placeholder="Wpisz hasło" name="password"  required>
                <br>
                <button type="submit" name='register'>Zarejestruj się</button>
            </div>

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
        await apiClient.Register(form.email.value, form.name.value, form.password.value)
        return false;
    }
    async logIn(form)
    {
        await apiClient.Login(form.email.value, form.password.value)
        return false;
    }
    async logout(){
        dataStorage.unsetUser();
        this.showLoginForm()
    }
}