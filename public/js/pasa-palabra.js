var questions =[]
var user = '';
var password = ''
var time = 150;
var puntos = 25;
var position = 0;
var statusCheck = false
var count = 0;
var usuarios;
var respons;
var newuserError;
//===================GAME =============//
//===================Start Game =============//
function startGame(){
    setTimeout(()=>{
        document.getElementById('loader').style.display = 'none';
        document.getElementById('game').style.display = 'inline';
        //Insertamos Letra Game
        document.getElementById('letter').innerHTML = 'A';
        document.getElementById('a').className +=' seleccionada';
        document.getElementById('pregunta').innerHTML = questions[position].question
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
            time --;   
            if(time < 0){time=0; return false}
            time !== 0 ? startTime() : check(true) 
            document.getElementById("timer").innerHTML = time 
    },1000)
}
//========================== Next Letra =======================//
function next(event){
    var letter = questions[position].letter;
    var status = questions[position].status;
    var respuesta = questions[position].answer;
    var respuestaUser = ''
        if(event){
            respuestaUser = document.getElementById("respuesta").value.toLowerCase();
            respuestaUser = respuestaUser.replace(/\í/g, 'i').replace(/\á/g, 'a').replace(/\é/g, 'e').replace(/\ó/g, 'o').replace(/\ú/g, 'u')
            if(respuesta !== respuestaUser) {
                //Marcamos Error
                document.getElementById(letter).className += " error";
                toast('La Palabra Correcta Es <b>' + respuesta.charAt(0).toUpperCase() + respuesta.slice(1),'error_outline',4000)
                //El status anterior
                questions[position].status = 2;
                document.getElementById("respuesta").value=''  
                document.getElementById("respuesta").focus();  
            } else {
                //Imprimimos puntos
                puntos --;
                document.getElementById("puntos").innerHTML = puntos;
                //Marcamos Correcto
                document.getElementById(letter).className += " correcto";
                //Modificar Status 1 == correcto
                //El status anterior
                questions[position].status = 1
                document.getElementById("respuesta").value=''  
                document.getElementById("respuesta").focus();  
            }     
         } //PasaPalabra
         else if(!event){
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
        //Printar siguiente pregunta
        var question = questions[position].question;
        document.getElementById("pregunta").innerHTML = question
        document.getElementById('letter').innerHTML = questions[position].letter.toLocaleUpperCase();
        document.getElementById(letter).classList.remove("seleccionada");
        document.getElementById(questions[position].letter).className +=' seleccionada';
        document.getElementById("respuesta").focus();

        check(false);
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
    time = 0;
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
    
    getAllPreguntas()
    element === true ? $('#modal-terminarPartida').modal('close') : console.log();
    document.getElementById('loaderHome').style.display = 'inline';
    document.getElementById('programa').style.display = 'none';
    document.getElementById('footer').style.display = 'none'
    document.getElementById('body').classList.remove('background');
    document.getElementById("puntos").innerHTML = 25;
    
    position = 0;
    document.getElementById('añadir-ranking').removeAttribute('disabled')

    document.getElementById('letter').innerHTML = 'A'
    document.getElementById('a').className +=' seleccionada';
    document.getElementById('game').style.display = 'inline'
    document.getElementById('fin-game').style.display = 'none'
}
function restartTime(){
    if (time === 0) {
        time = 150
        startTime()
    } else {
        time = 150;
    }
    document.getElementById("timer").innerHTML = 150
}
//================= TEMPLATES =====================//
//================== Pintar Circulo ==============//
function loaderHome(){
    setTimeout(()=>{
        document.getElementById('loaderHome').style.display = 'none';
        document.getElementById('programa').style.display = 'inline';
        document.getElementById('footer').style.display = 'inline'
        document.getElementById('body').className = 'background'
        document.getElementById('body').style.display = 'inline'
        document.getElementById('body').style.display = 'flex'
        restartTime()
    },2000)
}
function addCirculo(objeto){
    var print =''
    objeto.forEach(element => {
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
    document.getElementById('letter').innerHTML = ''
}
//================= Inputs auto Enter ==============//
function inputRespuesta (event){
    var code = event.which || event.keyCode;
      if( code === 13 ) {
        next(true);
        return false; 
      }
}
function inputUser (e){
    var code = event.which || event.keyCode;
      if( code === 13 ) {
        loginUsuario();
        return false; 
      }
}
//================= Windows.onload ==============//
//================== FIRST LOAD PAGE ============//
window.onload = () => { 
    getAllUser()
    document.onkeypress = userAndPass;
    //loaderHome()
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
    document.getElementById("login").style.display = 'none'
    document.getElementById('loader').style.display = 'inline-block'
    logInUser(user,password);   
}
//=================== Log Off ============= //
function logOff () {
    location.reload();
}
 //================= API FUNCTIONS ==============//
 //================= ALL USERS =================//
 function getAllUser() {
    fetch('api/user/')
    .then(response => {
      if (response.status === 200) { return response.json();} 
      else { throw new Error('Something went wrong on api server!');}
    })
    .then(response => {
        usuarios = response  
        printRanking(usuarios)
    }).catch(error => {
      console.error(error);
    })
 }
//===================== Inser new User ==========//
function newUser (user,pass) {
    var payload ={
            userName: user, 
            password: pass, 
            correctas : 0, 
            incorrectas : 0
    }
    var myHeaders = new Headers();  
    myHeaders.append('Content-Type', 'application/json'); 
    fetch('api/user/', {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(payload)
    })
    .then(response => {
    if (response.status === 200) { return response.json();} 
    else { throw new Error('Something went wrong on api server!');}
    })
    .then(response => {
    newuserError = response
    if(newuserError.message === false){ //El usuario esta REPETIDO!
        document.getElementById("user-pass").value = ''
        document.getElementById("user-passTwo").value = ''
        document.getElementById("user-register").value = ''

        toast('<span>El usuario '+newuserError.user+' ya <b>Existe!</b></span>','account_circle',4000)
        document.getElementById('user-register').focus()    
    } else {
        $('#modal1').modal('close');
        document.getElementById('insert-user').focus()
    }
    }).catch(error => {console.error(error);})
}
//====================== Log In User ==================//
    function logInUser (user,pass) {
        var payload ={
            userName: user, 
            password: pass
        }   
    var myHeaders = new Headers();  
    myHeaders.append('Content-Type', 'application/json'); 
    fetch('api/user/login', {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.status === 200) { return response.json();} 
        else { throw new Error('Something went wrong on api server!');}
    })
    .then(response => {
        respons = response
        if(respons.message === false){
            setTimeout(()=>{
                document.getElementById("login").style.display = 'inline'
                document.getElementById('loader').style.display = 'none'
                document.getElementById('insert-user').value = ''
                document.getElementById('insert-pass').value = ''
                document.getElementById('label-user').classList.remove('active')
                document.getElementById('label-pass').classList.remove('active')
    
                toast('<span>Usuario o Contraseña <b>Incorrect@</b></span>','error_outline',4000)
                document.getElementById('user-register').focus()
            },1000)  
        }else {
            user = respons.user.userName;
            startGame()
        }
        return true
    }).catch(error => {console.error(error)})
}
//=================== Update User ===============//
function updateUser () {
    var correctas = parseInt(document.getElementById('correctas-fin').innerText)
    var incorrectas = parseInt(document.getElementById('incorrectas-fin').innerText)
    var payload= {
        userName: user,
        correctas: correctas,
        incorrectas:incorrectas
    }
    var myHeaders = new Headers();  
    myHeaders.append('Content-Type', 'application/json'); 
    fetch('api/user/', {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.status === 200) { 
            getAllUser()
            document.getElementById('añadir-ranking').setAttribute('disabled','disabled')
            return true
        } else { throw new Error('Something went wrong on api server!');}
    })
    .catch(error => {console.error(error)})
}
//=================== get All Preguntas ===============//
function getAllPreguntas() {
    fetch('api/preguntas/')
    .then(response => {
      if (response.status === 200) {return response.json();} 
      else { throw new Error('Something went wrong on api server!');}
    }).then((res) => {
         addCirculo(res)
         loaderHome()
         questions = res;
         document.getElementById("pregunta").innerHTML = questions[position].question
         console.log(questions)
    }).catch(error => {
      console.error(error);
    })
 }