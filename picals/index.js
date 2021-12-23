const parent = document.querySelector('.parent');
let pageNum = 1;
const api_key = '563492ad6f91700001000001f69f99f070014ee7b93ad04ebfe2e1e4'
const searchApi = `https://api.pexels.com/videos/search?query=nature&per_page=1`;
const input = document.querySelector('#query');
const api = `https://api.pexels.com/v1/curated?per_page=15&page=` + pageNum;
const moreBtn = document.querySelector('.more');
const form = document.querySelector('form');
// fetch api data
function getApi(api){
    fetch(api, {
        method: 'GET',
        headers: {
            'Authorization': api_key
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createEl(data.photos);
    })
}
getApi(api);

function createEl(data){
    data.forEach(dat=> {
        let div = document.createElement('div');
        div.classList.add('col-md-4');
        div.classList.add('my-3');
        div.innerHTML = `
            <div class="card shadow">
                <div class="card-body text-center">
                <div class="figure">
                    <img src="${dat.src.medium}" alt="${dat.alt}" class="img-fluid">
                </div>
                <h4>${dat.photographer}</h4>
                </div>
            </div>
        `;
        parent.appendChild(div);
    })
}

form.addEventListener('submit', (e) => {
    if(input.value === ''){
        alert('Enter a photo query')
    }
    else{
        e.preventDefault();
        pageNum = 1;
        parent.innerHTML = '';
        const search = `https://api.pexels.com/v1/search?query=${input.value}`;
        getApi(search);

        setTimeout(()=> {
            input.value = '';
        },200)
    }
})

moreBtn.addEventListener('click', ()=> {
    pageNum++;
    const moreApi = `https://api.pexels.com/v1/curated?per_page=15&page=` + pageNum;
    getApi(moreApi);
})