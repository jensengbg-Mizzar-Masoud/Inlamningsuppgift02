const container = document.querySelector('.container');

function showBalls(balls) {

            balls.map(ball => {

                let htmlElem = `<section class="boller" id="${ball.id}"> 
                <img src="${ball.Image}">
                <article>
                    <p>${ball.Name}</p>
                    <p>priset:${ball.Price}</p>
                </article>
                <button class="btn2" href="#" >Lägg Till</button>
            </section>`;
            
            container.innerHTML += htmlElem;

            })

            addBall()

}

function addBall() {
    let arr = document.querySelectorAll('.btn2');
    for (let i = 0; i < arr.length; i++){
        arr[i].addEventListener('click', (e) => {
            let id = e.target.parentNode.id;
            let link = `http://localhost:1010/balls/add?id=${id}`
            fetch(link, {method: 'POST'})
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch(error => console.log(error))

            checkBall()
        });
    }
}

function checkBall(){
    
    let link = 'http://localhost:1010/korg';
    let link2 = 'http://localhost:1010/balls';

    fetch(link2, {method: 'GET'})
    .then(res => res.json())
    .then(balls => {
        
        fetch(link, {method: 'GET'})
    .then(response => response.json())
    .then(korgData => {
        for(let i = 0; i < korgData.length; i++){
            for(let k = 0; k < balls.length; k++){
                if(korgData[i].Name === balls[k].Name){
                    let id = balls[k].id;
                    let produkter = document.querySelectorAll('.boller');
                    let shopMark = `<p class="shopMark">Finns i korgen</p>`;
                    
                    for(let j = 0; j < produkter.length; j++){
                        if(produkter[j].id === id){
                            console.log(produkter[j]);
                            produkter[j].innerHTML += shopMark;
                        }
                    }
                }
            }
        }
    })
    .catch(error => console.log(error))

    })

    .catch(err => console.log(err));

}

function getBalls () {
    let link = 'http://localhost:1010/balls';

    fetch(link, {method : 'GET'})
    .then(response => response.json())
    .then(balls => showBalls(balls))
    .catch(error => console.log(error))
}



getBalls();
checkBall();
console.log('Balls ..');