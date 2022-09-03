const loadAllMenu = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const menuData = await response.json();
    return menuData;
}

const loadCategory = async (id) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    const categoryData = await response.json();
    return categoryData;
}


async function displayNews(id) {
    id = '0' + id;

    const menuData = await loadAllMenu();
    const categoryName = menuData.data.news_category[parseInt(id) - 1].category_name;
    console.log(categoryName)

    const data = await loadCategory(id);
    console.log(data.data)



    const name = document.getElementById('nameOfCategory')

    document.getElementById('numOfItem').innerText = (data.data.length)
    name.innerText = categoryName;



    const displaySection = document.getElementById('newsDisplay');
    displaySection.textContent = "";
    for (const index of data.data) {
        console.log(index.thumbnail_url)
        const div = document.createElement("div");
        div.innerHTML = `<div id="card">
        <img src="${index.thumbnail_url}" alt="">
    </div>`
        displaySection.appendChild(div)

    }




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

// button.innerText = categorys;

// button.id = id;

// button.onclick = async function () {
//     const data = await loadCategory(id);
//     console.log(data);


//     const div = document.createElement('div');

//     displaySection.appendChild(div)

// }
