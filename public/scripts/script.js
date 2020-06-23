
//Search recipes on click/ redirect for repice page
const cards = document.querySelectorAll('.box-card');
for (let i = 0; i < cards.length; i++) {

    (function (index) {
        cards[i].addEventListener("click", function () {
            window.location.href = `/recipe/${index}`
        });
    })(i);
}


/*===Show/hidden page recipe ===*/

const divInfo = document.querySelector('.repice-info')
const descriptions = divInfo.querySelectorAll('.info-hidden');

function hiddenShow(id) {
    let display = document.getElementById(`p${id}`).style.display;
    if (display == "none") {
        document.getElementById(`p${id}`).style.display = 'block';
        document.getElementById(id).innerHTML = 'Esconder';
    }
    else {
        document.getElementById(`p${id}`).style.display = 'none';
        document.getElementById(id).innerHTML = 'Mostrar';
    }
}

for (let description of descriptions) {

    description.addEventListener('click', function () {
        let pId = description.getAttribute('id')
        hiddenShow(pId)
    })
}

