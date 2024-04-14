const username = 'fylein'; // change the user name as u want(github user name only)
const perPageOptions = [10, 20, 50, 100];
let currentPage = 1;
let repositoriesPerPage = 10;

function fetchData() {
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`;
    
    
    $('#loader').show();

    
    $.get(apiUrl, function(data) {
        
        $('#loader').hide();

        renderRepositoriesInRows(data, 2);

        renderPagination(data.length);
    });
}
function fetchData(searchTerm) {
    let apiUrl = `https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`;

    if (searchTerm) {
        apiUrl += `&q=${searchTerm}`;
    }


    $('#loader').show();

    // data is fetched here
    $.get(apiUrl, function (data) {
        // hiding loader after fetching data
        $('#loader').hide();

        // rendering repos
        renderRepositoriesInRows(data, 2);

       
        renderPagination(data.length);
    });
}
function renderRepositoriesInRows(repositories, repositoriesPerRow) {
    const repositoriesContainer = $('#repositories');
    repositoriesContainer.empty();

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

    // selecting no. of repos to display in a page

    const perPageSelect = $('<select id="perPageSelect">');
    perPageOptions.forEach(option => {
        const optionElement = $('<option>', { value: option, text: option });
        if (option === repositoriesPerPage) {
            optionElement.attr('selected', 'selected');
        }
        perPageSelect.append(optionElement);
    });
        perPageSelect.change(function() {
        repositoriesPerPage = parseInt($(this).val());
        currentPage = 1;
        fetchData();
    });

    pageInfo.append(perPageSelect);
}

fetchData();
