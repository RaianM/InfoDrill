const api_url = 
"https://api.eia.gov/v2/petroleum/pri/land1/data/?api_key=P8RaabkofwdUzmf5q5NKFj1axbWh70yWKQ4mZVYt&data[]=value";

const response = await fetch(api_url); 
var data = await response.json();
let landedCosts = [];
var arrSize = data['response']['data'].length;

for(let i = 0; i < arrSize; i++) {
    if (data['response']['data'][i]['period'] == 2021 && data['response']['data'][i]['value'] != null && data['response']['data'][i]['value'] != 0 && data['response']['data'][i]['area-name'] != "NA") {
        let cost = [data['response']['data'][i]['period'], data['response']['data'][i]['area-name'], data['response']['data'][i]['value']];
        landedCosts.push(cost);      
    }
}

export function getLabels() {
    let sendOilStuff = [];
    let sendOilLabels = [];
    let sendOilData = [];
    for(let i = 0; i < landedCosts.length; i++) {
        sendOilLabels[i] = landedCosts[i][1];
    }
    for(let i = 0; i < landedCosts.length; i++) {
        sendOilData[i] = landedCosts[i][2];
    }
    sendOilStuff[0] = sendOilLabels;
    sendOilStuff[1] = sendOilData;

    return sendOilStuff;
}