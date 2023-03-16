// Variables 

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let  tweets = [];


//Event Listeners

eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {

        //Si al cargar el documento localStorage esta vacio se creara como un arreglo vacio
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    });
}





//Funciones

function agregarTweet(e){
    e.preventDefault();

    //obtener contenido del textarea
    const tweet = document.querySelector('#tweet').value;
    

    //Validacion
    if( tweet === ''){
        //console.log('Agrega algo');
        mostrarError('No puede ir vacio');
        return; //evita que se ejecuten mas lineas de codigo
    }

    //Crear un arreglo con los tweets usando .now para creat un id ya que no tenemos una BD
    const tweetObj = {
        id: Date.now(),
        //tweet: tweet es lo mismo
        tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    //Una vez agregado mostrar un listado de los tweets
    crearHTML();

    //Reinciar form
    formulario.reset();
}

//MOstrar mensaje de erros

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Eliminar mensaje despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            //Agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion eliminar: Se le tendra que pasar el id, es decir se le pasaran 
            //parametros por eso debe colocarse como un arrowFunction
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear li de HTML
            const li = document.createElement('li');

            //añadir texto
            li.innerText = tweet.tweet; //pertenecen al forEach. tweetObj

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertar en el HTML
            //console.log(li);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//agregar los tweets a local storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Eliminar el tweet
function borrarTweet(id){
    //console.log('borrando', id);
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}