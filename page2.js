const username = 'fylein'; // its the of github user , change user as u want

let currentPage = 1;
let repositoriesPerPage = 1000000;

function fetchData() {
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`;
    
    // Show loader
    $('#loader').show();

    // data is fetched heew 
    $.get(apiUrl, function(data) {
        
        $('#loader').hide();

        
        renderRepositoriesInRows(data, 2);

        
       
    });
}

   

function renderRepositoriesInRows(repositories, repositoriesPerRow) {
    const repositoriesContainer = $('#repositories');
    repositoriesContainer.empty();

    // rows
    const numRows = Math.ceil(repositories.length / repositoriesPerRow);

    for (let i = 0; i < numRows; i++) {
        const row = $('<div class="row">');
        const rowRepositories = repositories.slice(i * repositoriesPerRow, (i + 1) * repositoriesPerRow);
        renderRowRepositories(row, rowRepositories);
        repositoriesContainer.append(row);
    }
}

function renderRowRepositories(row, repositories) {
    repositories.forEach(repo => {
        const repoElement = $('<div class="repository">');
        repoElement.append(`<h2>${repo.name}</h2>`);
        
        
        //topics in blue boxes
        const topics = repo.topics || [];
        const topicsElement = $('<div class="topics">');
        topics.forEach(topic => {
            topicsElement.append(`<span class="topic-box">${topic}</span>`);
        });
        repoElement.append(topicsElement);

        row.append(repoElement);
    });
}



function renderPagination(totalRepositories) {
    const pageInfo = $('#pageInfo');
    pageInfo.text(`Page ${currentPage} of ${Math.ceil(totalRepositories / repositoriesPerPage)}`);
  pageInfo.append(perPageSelect);
}
fetchData();
