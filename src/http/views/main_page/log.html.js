var logpage = `
<div id="logsite" >
    <form onsubmit="return logIn(this)" id="logblock">
        <div class="container">

            <label for='email' name:"email"> <b>E-mail</b></label>
            <input type="email" placeholder="Wpisz email" name="uname" id='email' required>

            <label for='password' name="password"><b>Hasło</b></label>
            <input type="password" placeholder="Wpisz hasło" name="password" id='password' required>

            <button type="submit" name='login'>Zaloguj się</button>
        </div>

    </form>
    <form onsubmit="return register(this)" id="regblock">
            <div class="container">

                <label for='email' name:"email"> <b>E-mail</b></label>
                <input type="email" placeholder="Wpisz email" name="uname" id='email' required>


                <label for='name'> <b>Nazwa użytkownika</b></label>
                <input type="name" placeholder="Wpisz nazwę użytkownika" name="name" id='name' required>


                <label for='password' name="password"><b>Hasło</b></label>
                <input type="password" placeholder="Wpisz hasło" name="password" id='password' required>

                <button type="submit" name='register'>Zarejestruj się</button>
            </div>

        </form>
</div>
<button id="log">Logowanie</button>
<button id="reg">Rejestracja</button>
<script>
$('#logblock').show();
$('#regblock').hide();
$('#log').on('click', function(){
	$('#logblock').show();
	$('#regblock').hide();
});
$('#reg').on('click', function(){
	$('#logblock').hide();
	$('#regblock').show();
});
</script>

`;

function logIn(form)
    {
    apiClient.Login(form.email.value, form.password.value)
    return false;
    }
function register(form)
    {
    apiClient.Register(form.email.value, form.name.value, form.password.value)
    return false;
    }