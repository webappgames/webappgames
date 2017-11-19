export default function request (url: string, method='GET'):Promise<string> {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest() as any;
        //xhr.withCredentials = true;
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: (this as any).status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: (this as any).status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}