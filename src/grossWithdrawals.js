function checkLocation(grossWithdrawals, location) {
    let size = grossWithdrawals.length;
    for(let i = 0; i < size; i++) {
        if(grossWithdrawals[i][1] == location) {
            return i;
        }
    }
    return -1;
}

const api_url = 
"https://api.eia.gov/v2/natural-gas/prod/sum/data/?api_key=P8RaabkofwdUzmf5q5NKFj1axbWh70yWKQ4mZVYt&data[]=value";

const response = await fetch(api_url); 
var data = await response.json();
let grossWithdrawals = [];
var arrSize = data['response']['data'].length;

for(let i = 0; i < arrSize; i++) {
    if (data['response']['data'][i]['period'] == 2020 && data['response']['data'][i]['value'] != null && data['response']['data'][i]['value'] != 0 && data['response']['data'][i]['area-name'] != "NA" && data['response']['data'][i]['area-name'] != "U.S.") {
        let withdrawal = [data['response']['data'][i]['period'], data['response']['data'][i]['area-name'], data['response']['data'][i]['value']];
        let index = checkLocation(grossWithdrawals, withdrawal[1]);
        
        if (index != -1) {
            grossWithdrawals[index][2] = grossWithdrawals[index][2] + withdrawal[2];
        }
        else {
            grossWithdrawals.push(withdrawal);
        } 
    }
}

export function getLabels() {
    let sendOilStuff = [];
    let sendOilLabels = [];
    let sendOilData = [];
    for(let i = 0; i < grossWithdrawals.length; i++) {
        sendOilLabels[i] = grossWithdrawals[i][1];
    }
    for(let i = 0; i < grossWithdrawals.length; i++) {
        sendOilData[i] = grossWithdrawals[i][2];
    }
    sendOilStuff[0] = sendOilLabels;
    sendOilStuff[1] = sendOilData;

    return sendOilStuff;
}