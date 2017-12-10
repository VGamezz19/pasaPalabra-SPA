var questions =[]
var user = '';
var password = ''
var time = 150;
var puntos = 25;
var eventT = false;
var position = 0;
var statusCheck = false
var count = 0;
var usuarios;
var respons;
var newuserError;
var statusTime = false

//===================GAME =============//
//===================Start Game =============//
function startGame(){
    setTimeout(()=>{
        document.getElementById('loader').style.display = 'none';
        document.getElementById('game').style.display = 'inline';
        //Insertamos Letra Game
        document.getElementById('letter').innerHTML = 'A';
        document.getElementById('a').className +=' seleccionada';
        //printUser
        document.getElementById('userName').innerHTML = user
        startTime();
        document.getElementById("respuesta").focus();   
    }, 3000) 
    // Restar Segundos  
 } 
 //===================Start Time =============//
 function startTime(){
    setTimeout(() => {
        if(!statusTime){
            time --;
            document.getElementById("timer").innerHTML = time
            time !== 0 ? startTime() : console.log()
           // console.log("Done", time)
            time === 0 ? check(true) : console.log()  
        } 
           
    },1000)
}
//========================== Next Letra =======================//
function next(event){
    var letter = questions[position].letter;
    var status = questions[position].status;
    var respuesta = questions[position].answer;
        if(event){
            if(respuesta !== document.getElementById("respuesta").value.toLowerCase()) {
                //Marcamos Error
                document.getElementById(letter).className += " error";
                toast('La Palabra Correcta Es <b>' + respuesta.charAt(0).toUpperCase() + respuesta.slice(1),'error_outline',4000)
                //El status anterior
                questions[position].status = 2;
            } else {
                //Imprimimos puntos
                puntos --;
                document.getElementById("puntos").innerHTML = puntos;
                //Marcamos Correcto
                document.getElementById(letter).className += " correcto";
                //Modificar Status 1 == correcto
                //El status anterior
                questions[position].status = 1
            }
         } //PasaPalabra
         else if(!eventT){
             document.getElementById("respuesta").focus();     
         }
        //Buscar la proxima POSICION
        var BreakException = {}; 
        try {
            for(var i = position; i<questions.length; i++){
                if(position === 24){
                    position = -1;
                    i= 0
                }
                position ++;
                if (questions[position].status === 0) throw BreakException;
            }
        } catch (e) {
            if (e !== BreakException) throw e;
        }

        check(false);
        //Printar siguiente pregunta
        var question = questions[position].question;
        document.getElementById("pregunta").innerHTML = question
        document.getElementById('letter').innerHTML = questions[position].letter.toLocaleUpperCase();
        document.getElementById(letter).classList.remove("seleccionada");
        document.getElementById(questions[position].letter).className +=' seleccionada';
        document.getElementById("respuesta").focus();
 }
//================== Fin de Roscon ==============//
function check(event) {
    if(!event){ //Si esta dentro de tiempo
        var count = 0;
        questions.forEach(element => {
            if(element.status !== 0){
                count ++;
            }
        });
        if(count === 25){
            statusCheck = true
            finGame(true)
        }
    } else if (!statusCheck){ //Si se termina el tiempo
        finGame(false)
    }
}
//================== Fin de Juego ==============//
function finGame(event){
    var correctas = 0
    var incorrectas = 0
    statusTime = true
    if(event){
        questions.forEach(element => {
            element.status === 1 ? correctas++ : incorrectas ++;
        });
    }else { //Fuera de teimpo
        questions.forEach(element => {
            if(element.status === 1){
                correctas ++
            } else { //Las no respuestas tambien incorrectas
                incorrectas ++
            }
        });
    }
    finTemplateGame(correctas,incorrectas)
}
//================== Repetir pasa palabra ==============//
function repetirPasaPalabra(element){
    getAllPreguntas();
    element === true ? $('#modal-terminarPartida').modal('close') : console.log();
    document.getElementById('loaderHome').style.display = 'inline';
    document.getElementById('programa').style.display = 'none';
    document.getElementById('footer').style.display = 'none'
    document.getElementById('body').classList.remove('background');
    loaderHome();
    document.getElementById("timer").innerHTML = 153
    time = 153;
    statusTime = false
    startTime();  
    document.getElementById("puntos").innerHTML = 25;
    position = 0;
    
    document.getElementById("pregunta").innerHTML = questions[position].question
    document.getElementById('letter').innerHTML = questions[position].letter.toUpperCase();
    document.getElementById('a').className +=' seleccionada';
    document.getElementById('game').style.display = 'inline'
    document.getElementById('fin-game').style.display = 'none'
}
//================= TEMPLATES =====================//
//================== Pintar Circulo ==============//
function loaderHome(){
    setTimeout(()=>{
        document.getElementById('loaderHome').style.display = 'none';
        document.getElementById('programa').style.display = 'inline';
        document.getElementById('body').className = 'background'
        document.getElementById('footer').style.display = 'inline'
    },3000)
}
function addCirculo(){
    var print =''
    questions.forEach(element => {
        print += "<li class='item' id= '"+element.letter+"'>"+element.letter.toUpperCase()+"</li>"
    });
    document.getElementById('ciculo').innerHTML = print;
}
//================== Pintar Ranking ==============//
function printRanking(usuarios) {
    var print = ''
    var position = 0;

    setTimeout(()=>{
        usuarios.forEach(element => {
            if((element.incorrectas + element.correctas) === 25){
                var date = new Date(element.ultimaPartida)
                date = date.getDate() +"/"+date.getMonth()+"/"+date.getFullYear() 
                position ++;
                print += '<li class="collection-item row">'
                print +='<div class = "col s3">'+ position + " - " +element.userName +'</div>'
                print +='<div class = "col s3" style = "color:#4CAF50">' +element.correctas +'</div>'
                print +='<div class = "col s3" style = "color:#F44336">' +element.incorrectas +'</div>'
                print +='<div class = "col s3">' +date +'</div>'
                print += '</li>'
            }
        });
        document.getElementById('ranking').innerHTML = print
        
    },300) 
}
//================= Template Log IN ==============//
function changeInput(){
    document.getElementById("content-text").style.display = 'none'
    document.getElementById('login').style.display = 'inline'
    //document.getElementById('insert-user').focus()
    userAndPass()
}
//================= Toast Template ==============//
function toast(text,icon,time){
    //PopUP Content HTML
    $toastContent = $('<i class="material-icons prefix popUp" style = "color:red">'+icon+'</i>')
    .add($('<span>'+ text +'</span>'));
    //SHOW POP UP
    Materialize.toast($toastContent, time);
}
//================= Template Final Game ==============//
function finTemplateGame(correctas, incorrectas) {
    var date = new Date()
    date = date.getDate() + "/" + date.getMonth() + "/" +date.getFullYear()

    document.getElementById('game').style.display = 'none'
    document.getElementById('fin-game').style.display = 'inline'
    document.getElementById('user-fin').innerHTML = user
    document.getElementById('correctas-fin').innerHTML = correctas
    document.getElementById('incorrectas-fin').innerHTML = incorrectas
    document.getElementById('date-fin').innerHTML = date
}

//================= Windows.onload ==============//
//================== FIRST LOAD PAGE ============//
window.onload = () => { 
    getAllUser()
    document.onkeypress = userAndPass;
    loaderHome()
    getAllPreguntas()
    
 }
 //================= User and Pass =======================//
function userAndPass() {
    if(document.getElementById("insert-user").value && document.getElementById("insert-pass").value) {
        document.getElementById("master-button").removeAttribute('disabled')
    }else {
        document.getElementById("master-button").setAttribute('disabled','disabled')
    }
}
//===================  Gestion USUARIO ======================//
//=================== Sing In ============= //
function addUserNew(){
    var user = ''
    var pass = ''

    if (document.getElementById("user-passTwo").value === document.getElementById("user-pass").value) {
       user = document.getElementById("user-register").value 
       pass = document.getElementById("user-pass").value
       newUser(user,pass);

    } else {
        document.getElementById("user-pass").value = ''
        document.getElementById("user-passTwo").value = ''
        document.getElementById("user-register").value = ''
        document.getElementById("user-register").focus()
        toast('<span>Las contraseñas no <b>Coinciden</b></span>','https',4000)
    }
}
//=================== Log In ============= //
function loginUsuario(){
    user = document.getElementById('insert-user').value;
    password = document.getElementById('insert-pass').value;
    logInUser(user,password);   
}
//=================== Log Off ============= //
function logOff () {
    location.reload();
}
 //================= API FUNCTIONS ==============//
 //================= ALL USERS =================//
function getAllUser() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3020/api/user/";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            usuarios = JSON.parse(this.responseText);
            printRanking(usuarios)
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//===================== Inser new User ==========//
function newUser (user,pass) {
    var xmlhttp = new XMLHttpRequest();
    //var myArr;
    var url = "http://localhost:3020/api/user/";
    var user = user;
    var password = pass;
    var correctas = 0;
    var incorrectas = 0;
    var ultimaPartida = new Date();

    xmlhttp.open("POST", url , true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(this.readyState == 4 && this.status == 200) {
            newuserError = JSON.parse(this.responseText)
            if(newuserError.message === false){ //El usuario esta REPETIDO!
                document.getElementById("user-pass").value = ''
                document.getElementById("user-passTwo").value = ''
                document.getElementById("user-register").value = ''

                toast('<span>El usuario ya <b>Existe!</b></span>','account_circle',4000)
                document.getElementById('user-register').focus()    
            } else {
                $('#modal1').modal('close');
                document.getElementById('insert-user').focus()
            }
            return true
        } else {
            return false
        }
    }
    xmlhttp.send(JSON.stringify({ userName: user, password: password, correctas : correctas, incorrectas : incorrectas}));
}

//====================== Log In User ==================//
function logInUser (user,pass) {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3020/api/user/login";
    var user = user;
    var password = pass;

    xmlhttp.open("POST", url , true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(this.readyState == 4 && this.status == 200) {
            respons = JSON.parse(this.responseText);
            console.log(respons)
            if(respons.message === false){
                document.getElementById('insert-user').value = ''
                document.getElementById('insert-pass').value = ''
                document.getElementById('label-user').classList.remove('active')
                document.getElementById('label-pass').classList.remove('active')
    
                toast('<span>Usuario o Contraseña <b>Incorrect@</b></span>','error_outline',4000)
                document.getElementById('user-register').focus()
            }else {
                user = respons.user.userName;
                //Ejecutamos Logica Game
                document.getElementById("login").style.display = 'none'
                document.getElementById('loader').style.display = 'inline-block'
                //A los 3 se ejecuta el juego
                startGame()
            }
            return true
        } else {
            respons = false
            return false
        }
    }
    xmlhttp.send(JSON.stringify({ userName: user, password: password}));
}

//=================== Update User ===============//
function updateUser () {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3020/api/user/";
    var correctas = parseInt(document.getElementById('correctas-fin').innerText)
    var incorrectas = parseInt(document.getElementById('incorrectas-fin').innerText)

    xmlhttp.open("PUT", url , true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
        if(this.readyState == 4 && this.status == 200) {
            getAllUser()
            return true
        } else {
            return false
        }
    }
    xmlhttp.send(JSON.stringify({ userName: user, correctas: correctas, incorrectas:incorrectas}));
}

//=================== get All Preguntas ===============//
function getAllPreguntas() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3020/api/preguntas/";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log( JSON.parse(this.responseText))
            // var xdxd = []
            // var numero = 0
            questions = JSON.parse(this.responseText)
            // console.log(xdxd )
            // xdxd.forEach(element => {
            //     console.log(element)
            // });
            addCirculo()
            
        }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
