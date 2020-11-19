export function PostData(type, userData, method) {
    let BaseUrl = 'http://127.0.0.1:8000/';
    
    return new Promise((resolve, reject) => {
        if (method === 'GET') {
            fetch(BaseUrl+type, {
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            });
        } else {
            fetch(BaseUrl+type, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            });
        }
        
    }); 
}