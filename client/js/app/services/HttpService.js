class HttpService {

    _handleErros(response) {
        if(!response.ok) throw new Error(response.statusText);
        return response;
    }

    get(url) {

        return fetch(url)
            .then(response => this._handleErros(response))
            .then(response => response.json());

        /* return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }

            xhr.send();
        }); */
    }

    post(url, dado) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.response == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.send(JSON.stringify(dado));
        });
    }
}