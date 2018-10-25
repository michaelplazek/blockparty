import { getSession } from "../actions/session";

const BASE_URL = 'http://localhost:8000';

export const wrappedFetch = (url = '', data = {}, type = 'GET') => {
    const newUrl = `${BASE_URL}/${url}`;
    const token = getSession();
    const promise = type !== 'GET' ? fetch(newUrl, {
        method: type,
        mode: "cors",
        // credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data),
    }) : fetch(newUrl, { method: 'GET', Authorization: `Bearer ${token}`, });

    return promise
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .catch(e => console.log(e))
};

export const wrappedFetchWithParams = (url = '', data = {}, type = 'GET', params = '') => {
	const newUrl = `${BASE_URL}/${url}?${params}`;
	const token = getSession();
	const promise = type !== 'GET' ? fetch(newUrl, {
		method: type,
		mode: "cors",
		// credentials: 'include',
		headers: {
			"Content-Type": "application/json; charset=utf-8",
		},
		referrer: "no-referrer",
		body: JSON.stringify(data),
	}) : fetch(newUrl, { method: 'GET', Authorization: `Bearer ${token}`, });

	return promise
		.then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
		.then(response => {
			if (response.status === 200) {
				return response.json();
			}
		})
		.catch(e => console.log(e))
};

export const fetchToken = token => {
    const newUrl = `${BASE_URL}/users/user_from_token/token?token=${token}`;
    const promise = fetch(newUrl, {
        method: 'GET',
        Authorization: `Bearer ${token}`,
    });

    return promise
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .catch(e => console.log(e))
};