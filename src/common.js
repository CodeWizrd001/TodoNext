async function makeRequest(endpoint, body, method) {
    let headers = {
        'Content-Type': 'application/json'
    }

    let requestOptions  =  {
        method: method ,
        headers: headers ,
        withCredentials: true,
        credentials: 'include' ,
    } ;

    if(method === 'POST' || method === 'PUT'){
        requestOptions.body = JSON.stringify(body);
    }

    try {
        let result = await fetch(this.url + endpoint, requestOptions) ;
        let data = await result.json() ;
        return data ;
    } catch (error) {
    console.log(error) ;
        return null ;
    }
}

