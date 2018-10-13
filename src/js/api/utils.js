const BASE_URL = 'http://localhost:8000';

export const sendData = (url = '', data = {}, type = 'GET') => {
    const newUrl = `${BASE_URL}/${url}`;
    const promise = type !== 'GET' ? fetch(newUrl, {
        method: type,
        mode: "cors",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data),
    }) : fetch(newUrl);

    return promise
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .then(response => response.json())
        .catch(e => console.log(e))
};