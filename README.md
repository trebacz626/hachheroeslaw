# Moj sejm
 
 Autoryzacja  
 urzytkownik po zalogowaniu/zarejestrowaniu otrzymuje refreshToken, ktory moze wykorzystac by otrzymac/odswiezyc access_token, który jest ważny pol godziny. access_token powinien byc załączony jako nagłówek i jeśli uzytkownik otrzyma w odpowiedzi kod 401 to powinien go odswiezyc pod endpointem: /authentication/refreshaccessToken
 
 Dostępne endpointy /api  
 POST /authentication/register argumenty email,name,password zwraca obiekt User  
 POST /authentication/login argumenty email,password zwraca obiekt User  
 GET /authentication/currentuser zwraca aktualnego uzytkownika   
 POST /authentication/refreshaccessToken odswiezenie tokena argumenty refreshToken  
 
 GET /laws/all wszystkie ustawy TYLKO ZALOGOWANY UZYTKOWNIK  
 GET /laws/page/:num wszystkie ustwy wedlug strony  
 GET /laws/page/:num/:status wszystkie ustawy wedlug strony i statusu  
 POST /laws/:id/vote/disable usuniecie glosu na ustawe TYLKO ZALOGOWANY UZYTKOWNIK  
 POST /laws/:id/vote/:upordown glosowanie na ustawy  upordown={"up" lub "down"}  TYLKO ZALOGOWANY UZYTKOWNIK  
 GET /laws/:id dane ustawy wedlug id  
 GET /user/getmyvotes glosy oddane przez uzytkownika TYLKO ZALOGOWANY UZYTKOWNIK  
 
 
 
 link do projektu aplikacji android:  

 
 
