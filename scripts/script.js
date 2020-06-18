const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.box-card');

for (let card of cards ){
    card.addEventListener('click', function(){
        const imgId = card.getAttribute('id');
        const description = card.querySelector('.box-name p').innerHTML;
        const chef = card.querySelector('.box-info p').innerHTML;
        modalOverlay.classList.add('active');

        modalOverlay.querySelector("#img-demo").src=`/assets/${imgId}.png`;
        modalOverlay.querySelector("#p-description").innerHTML = `${description}`;
        modalOverlay.querySelector("#p-chef").innerHTML = `${chef}`;

    })
}

document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active');
   // modalOverlay.querySelector('#demo').innerHTML = "";
})