const api_url = 
"https://api.eia.gov/v2/natural-gas/prod/sum/data/?api_key=P8RaabkofwdUzmf5q5NKFj1axbWh70yWKQ4mZVYt&data[]=value";

const response = await fetch(api_url); 
var data = await response.json();
let grossWithdrawals = [];
var arrSize = data['response']['data'].length;

for(let i = 0; i < arrSize; i++) {
    if (data['response']['data'][i]['period'] == "2020" && data['response']['data'][i]['value'] != null && data['response']['data'][i]['value'] != 0) {
        let withdrawal = [data['response']['data'][i]['period'], data['response']['data'][i]['area-name'], data['response']['data'][i]['value']] ;
        grossWithdrawals.push(withdrawal);
    }
}

console.log(grossWithdrawals);