window.onload = displayNews(1);

async function loadAllMenu() {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const menuData = await response.json();
    return menuData;
}

const loadCategory = async (id) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const categoryData = await response.json();
    return categoryData;
}


async function displayNews(id) {
    const spinner = document.getElementById('loading')
    spinner.style["display"] = "";
    id = '0' + id;
    const menuData = await loadAllMenu();
    const categoryName = menuData.data.news_category[parseInt(id) - 1].category_name;
    console.log(categoryName)

    const data = await loadCategory(id);
    console.log(data.data)
    const name = document.getElementById('nameOfCategory')

    document.getElementById('numOfItem').innerText = (data.data.length)
    name.innerText = categoryName;

    const displaySection = document.getElementById('newsArticle');
    displaySection.textContent = "";
    if (data.data.length != 0) {
        for (const index of data.data) {
            let cardId = index._id;
            console.log(cardId)
            let title = index.title;
            let details = index.details;
            let detailsFull = details;
            details = ellipsify(details);
            function ellipsify(details) {
                if (details.length > 500) {
                    return (details.substring(0, 500) + "...");
                }
                else {
                    return details;
                }
            }
            let authorName = index.author.name;
            console.log(authorName)
            let thumbnail = index.thumbnail_url;
            if (authorName === null)
                authorName = "Author name unknown";
            let viewCount = index.total_view;
            if (viewCount === null)
                viewCount = "View count not available";
            const div = document.createElement("div");
            div.innerHTML = `<section id="newsDisplay">
            <div id="newsDisplayCard">
                <img src="${thumbnail}" alt="">
                <div id="newsDisplayCardDetails">
                    <h1>
                        ${title}
                    </h1>
                    <p>${details}
                    </p>
                    <div id="author">
                        <span id="authorInfo">
                            <img src="${index.author.img}"
                                alt="">
                            <h4>${authorName}</h4>
                        </span>
                        <span id="views">
                            <i class="fa-solid fa-users-viewfinder"></i>
                            <p>${viewCount}</p>
                        </span>
                        <span id="modalButton">
                            <button id="myBtn${cardId}" onclick="modal('${cardId}')">Show More</button>

                            <div id="myModal${cardId}" class="modal">

                            <div class="modal-content">
                                <span class="close close${cardId}">&times;</span>
                                <h3>${title}</h3>
                                <p>${detailsFull}</p>
                                <div id="author">
                                    <span id="authorInfo">
                                        <img src="${index.author.img}"
                                            alt="">
                                        <h4>${authorName}</h4>
                                    </span>
                                    <span id="views">
                                        <i class="fa-solid fa-users-viewfinder"></i>
                                        <p>${viewCount}</p>
                                    </span>
                                </div>
                            </div>

                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </section>`
            displaySection.appendChild(div)
        }

    }
    spinner.style["display"] = "none";



}



const setAllMenu = async () => {
    const menuData = await loadAllMenu();

    const menus = menuData.data.news_category;

    const section = document.getElementById('menu');

    for (const menu of menus) {
        const categorys = menu.category_name;
        const span = document.createElement('span')
        const id = menu.category_id;
        span.innerHTML = `<button id="${id}" onclick="displayNews(${id})">${categorys}</button>`
        section.appendChild(span);
    }
}

setAllMenu();

function modal(id) {
    console.log(id)
    let modalId = "myModal" + id;
    console.log(modalId)
    let btnId = "myBtn" + id;
    console.log(btnId)
    let closeId = "close" + id;
    // Get the modal
    var modal = document.getElementById(modalId);
    // Get the button that opens the modal
    var btn = document.getElementById(btnId);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName(closeId)[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


