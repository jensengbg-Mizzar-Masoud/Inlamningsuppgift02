const cart = document.querySelector('.cart');
const total = document.querySelector('#total');

function getKorg () {

    let link = 'http://localhost:1010/korg';
    fetch(link, {method: 'GET'})
    .then(response => response.json())
    .then(balls => showKorg(balls))
    .catch(error => console.log(error))

}

function showKorg(balls) {

    balls.map( ball => {
        let korgInfo = `<div class="produkt" id="${ball.id}"><img src="${ball.Image}" alt="">
        <article>
        <p>${ball.Name}</p>
        <p>Priset: ${ball.Price}</p>
        </article>
        <button class="btn1">Ta Bort</button>
    </div>`;

    cart.innerHTML += korgInfo;

    });

    removeBall();
    totalSum(balls);
}

function removeBall() {
    let arr = document.querySelectorAll('.btn1');
    
    for(let i = 0; i < arr.length; i++){
        arr[i].addEventListener('click', (e) => {
            let id = e.target.parentNode.id;
            let link = `http://localhost:1010/balls/remove?id=${id}`
            fetch(link, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.log(error))

            location.reload();
        })
    }
    
}

function totalSum(balls) {
    let summan = 0;
    balls.map(ball => {
        let price = parseInt(ball.Price);
        summan += price;
    })
    total.innerHTML = summan + ' kr';
}

getKorg();