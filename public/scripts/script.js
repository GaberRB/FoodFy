//Search recipes on click/ redirect for repice page
const currentPage = location.pathname
console.log(currentPage)
const cards = document.querySelectorAll('.box-card');
for (let i = 0; i < cards.length; i++) {

    (function (index) {
        cards[i].addEventListener("click", function () {
            if (currentPage.includes('admin/recipes')){
                const id = document.querySelectorAll('#idAdmRecipe')
                window.location.href = `/admin/recipes/${id[index].value}`
            }else if (currentPage.includes('admin/chefs')){
                const id = document.querySelectorAll('#idChef')
                window.location.href = `/admin/chefs/${id[index].value}`
            }else if (currentPage.includes('/recipes')){
                const id = document.querySelectorAll("#idRecipe")
                window.location.href = `/recipes/${id[index].value}`
            }else if(currentPage.includes('/chefs')){
                const id = document.querySelectorAll("#idChef")
                window.location.href = `/chefs/${id[index].value}`
            }
                
        });
    })(i);
}

/*pagination*/
//paginação
function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {


        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {


            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')

            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)

            }

            pages.push(currentPage)
            oldPage = currentPage

        }

    }
    return pages
}
function createPaginaton(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    let elements = ""

    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }

        }

    }

    pagination.innerHTML = elements

}

const pagination = document.querySelector('.pagination')
if (pagination) {
    createPaginaton(pagination)

}
