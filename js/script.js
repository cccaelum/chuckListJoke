const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
let jokes = JSON.parse(localStorage.getItem('joke')) || [];


const getJoke = () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error("La solicitud no fue exitosa");
            }
            return response.json();
        })
        .then(joke => {
            if (!jokes.includes(joke.value)) { // Si el chiste no está ya en jokes, 
                jokes.push(joke.value); // lo añade al array, 
                localStorage.setItem('joke', JSON.stringify(jokes)); // actualiza el localStorage con el nuevo array 
                renderJokes(); // y vuelve a renderizar los chistes
                console.log('Chistes guardados en localStorage:', jokes);
            }
        })
        .catch(error => {
            console.error('Error al cargar el chiste', error);
        });
};

const deleteJoke = (jokeText) => {
    jokes = jokes.filter(joke => joke !== jokeText);
    localStorage.setItem('joke', JSON.stringify(jokes));
    renderJokes();
};

const renderJokes = () => {
    jokeList.innerHTML = '';
    jokes.forEach(joke => {
        const li = document.createElement('li');
        li.innerHTML = `<p>${joke}</p><button class="btnDelete">Eliminar</button>`;
        jokeList.appendChild(li);

        li.querySelector('.btnDelete').addEventListener('click', () => {
            deleteJoke(joke);
        });
    });
};

fetchJoke.addEventListener('click', getJoke);

// Renderizar chistes guardados al recargar la página
window.addEventListener('load', renderJokes);