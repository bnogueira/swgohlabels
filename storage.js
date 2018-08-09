
function getObjectFromStorage(key) {
    var value = localStorage.getItem(key);
    if (value == null)
        return null;

    return JSON.parse(value);
}

function storeObjectInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function clearLocalStorage() {
    localStorage.clear();
}