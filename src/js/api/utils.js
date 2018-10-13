const BASE_URL = 'http://localhost:8000';

export const sendData = (url = '', data = {}, type = 'GET') => {
    const newUrl = `${BASE_URL}/${url}`;
    const promise = type !== 'GET' ? fetch(newUrl, {
        method: type,
        mode: "no-cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }) : fetch(newUrl);

    return promise
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .then(response => response.json())
        .catch(e => console.log(e))
};