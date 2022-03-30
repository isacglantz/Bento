// Functions to handle search

const searchElement = document.querySelector('#search');
const searchProviders = CONFIG.searchProviders;

window.onload = addSearchListener();

function addSearchListener() {
    console.log('ADD')
    searchElement.addEventListener('change', () => {
        search(searchElement.value);
    });
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === 'q') {
            searchElement.focus();
        }
    })
}

function parseUrl(link, query) {
    return link + encodeURIComponent(query);
}

function parseAndOpenUrl(link, query) {
    console.log('Searching with ', link);
    const parsedUrl = parseUrl(link, query);
    console.log('Redirect', parsedUrl)
    window.open(parsedUrl, "_self");
}

function search(query) {
    query = query.trim();

    // If length is less than 3 we know there is no prefix
    if(query.length < 3) {
        parseAndOpenUrl(searchProviders[0].link, query);
    }

    // Get the three first chars from query
    const firstThreeInQuery = query.slice(0, 3);

    // Search through all providers and see if their prefix is included
    for (let provider of searchProviders) {
        console.log(`First: ${firstThreeInQuery} and prefix: ${provider.prefix} is weak true ${firstThreeInQuery == provider.prefix} but not hard true ${firstThreeInQuery === provider.prefix}`);

        if (firstThreeInQuery == provider.prefix) {
            console.log(provider.link, provider.Description);
            parseAndOpenUrl(provider.link, query.slice(3));
            return true;
        }
    }

    // No prefix, use first search provider
    parseAndOpenUrl(searchProviders[0].link, query);
}
