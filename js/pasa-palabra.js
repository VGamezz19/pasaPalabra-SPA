var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    //{ letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    //{ letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]

var usuarios = [
    {usuario: 'Pedro', ultimaPartida: '10/08/2017',correctas: 10, incorrectas: 15},
    {usuario: 'Miguel', ultimaPartida: '16/08/2017',correctas: 23, incorrectas: 2},
    {usuario: 'Juan', ultimaPartida: '11/08/2017',correctas: 12, incorrectas: 13},
    {usuario: 'vGamez', ultimaPartida: '10/05/2017',correctas: 9, incorrectas: 16},
    {usuario: 'JJperez', ultimaPartida: '10/08/2017',correctas: 24, incorrectas: 1},
    {usuario: 'Juanjo', ultimaPartida: '12/08/2017',correctas: 3, incorrectas: 22},
    {usuario: 'Guimenez', ultimaPartida: '10/08/2017',correctas: 20, incorrectas: 5},
    {usuario: 'Alejandro', ultimaPartida: '13/08/2017',correctas: 5, incorrectas: 20},
]

var user = '';
var pass = '';
var time = 150;
var puntos = 25;
var eventT = false;
var position = 0;

//================= TEMPLATES ==============//
function changeInput(){
    document.getElementById("content-text").style.display = 'none'
    document.getElementById('login').style.display = 'inline'
    document.getElementById('insert-user').focus()
}

function entra() {
    user = document.getElementById("insert-user").value
    //Ejecutamos Logica Game
    document.getElementById("login").style.display = 'none'
    document.getElementById('loader').style.display = 'inline-block'
    //A los 3 se ejecuta el juego
    setTimeout(function(){
        document.getElementById('loader').style.display = 'none';
        document.getElementById('game').style.display = 'inline';
        //Insertamos Letra Game
        document.getElementById('letter').innerHTML = 'A';
        document.getElementById('a').className +=' seleccionada';

        startTime();
        document.getElementById("respuesta").focus();   
    }, 3000) 
    // Restar Segundos
    function startTime(){
        setTimeout(function(){
            time --;
            document.getElementById("timer").innerHTML = time
            startTime();
           // console.log("Done", time)
            time === 0 ? check(true) : console.log()      
        },1000)
    }
}

//================= Game ==============//
var count = 0;
function next(event){
    var letter = questions[position].letter;
    var status = questions[position].status;
    var respuesta = questions[position].answer;

        if(event){
            if(respuesta !== document.getElementById("respuesta").value.toLowerCase()) {
                //Marcamos Error
                document.getElementById(letter).className += " error";
                //PopUP Content HTML
                $toastContent = $('<i class="material-icons prefix popUp" style = "color:red">error_outline</i>')
                                .add($('<span> La Palabra Correcta Es <b>'+ MaysPrimera(respuesta) +'</b></span>'));
                //SHOW POP UP
                Materialize.toast($toastContent, 4000);
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
        console.log(count, "Entra?", questions.length)
        if(count === 25){
            alert("fin")
        }
    } else { //Si se termina el tiempo
        alert("Se termino el pasapalabra")
    }
}
//================== Printar Ranking ==============//
function printRanking() {
    var print = ''
    var position = 0;
    usuarios.forEach(element => {
        position ++;
        print += '<li class="collection-item row">'
        print +='<div class = "col s3">'+ position + " - " +element.usuario +'</div>'
        print +='<div class = "col s3" style = "color:#4CAF50">' +element.correctas +'</div>'
        print +='<div class = "col s3" style = "color:#F44336">' +element.incorrectas +'</div>'
        print +='<div class = "col s3">' +element.ultimaPartida +'</div>'
        print += '</li>'
    });
    return print
}

//================= Windows.onliad ==============//
 window.onload = function() { 
    //  document.getElementById('modal1').modal()
    document.getElementById('ranking').innerHTML = printRanking()
     document.onkeypress = userAndPass;
 }

 //================= Window.Onload Functions ==============//
 // 1 _ User and Pass ??
function userAndPass() {
    if(document.getElementById("insert-user").value && document.getElementById("insert-pass").value) {
        document.getElementById("master-button").removeAttribute('disabled')
    }else {
        document.getElementById("master-button").setAttribute('disabled','disabled')
    }
}
//La primera en Mayuscula
function MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}


//TERMINAR LOGI DE FIN DE PARTIDA
//MODAL REGISTER

//BACK END PURO...