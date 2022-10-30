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
"https://api.eia.gov/v2/petroleum/crd/crpdn/data/?api_key=P8RaabkofwdUzmf5q5NKFj1axbWh70yWKQ4mZVYt&data[]=value";

const response = await fetch(api_url); 
var data = await response.json();
let grossWithdrawals = [];
var arrSize = data['response']['data'].length;

for(let i = 0; i < arrSize; i++) {
    if (data['response']['data'][i]['period'] == 2021 && data['response']['data'][i]['value'] != null && data['response']['data'][i]['value'] != 0 && data['response']['data'][i]['area-name'].includes("PADD") == false && data['response']['data'][i]['area-name'].includes("D") == false && data['response']['data'][i]['area-name'] != "NA") {
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

export function getStateLabels(state) {
    let stateD = [];
    for(let i = 0; i < arrSize; i++) {
        if (data['response']['data'][i]['area-name'] == state && data['response']['data'][i]['period'] >= 2012 && data['response']['data'][i]['value'] != null && data['response']['data'][i]['value'] != 0 && data['response']['data'][i]['area-name'].includes("PADD") == false && data['response']['data'][i]['area-name'].includes("D") == false && data['response']['data'][i]['area-name'] != "NA") {
            stateD.push([data['response']['data'][i]['period'], data['response']['data'][i]['value']]);
            console.log([data['response']['data'][i]['period'], data['response']['data'][i]['value']]);
        }
    }
    const stateData = stateD.sort((a, b) => a[0] - b[0])
    console.log(stateData);

    let sendStateStuff = [];
    let sendStateLabels = [];
    let sendStateData = [];

    for(let i = 0; i < stateData.length; i++) {
        sendStateLabels[i] = stateData[i][0];
    }
    for(let i = 0; i < stateData.length; i++) {
        sendStateData[i] = stateData[i][1];
    }
    sendStateStuff[0] = sendStateLabels;
    sendStateStuff[1] = sendStateData

    return sendStateStuff;
}