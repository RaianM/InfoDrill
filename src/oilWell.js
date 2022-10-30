const api_url = 
"https://api.eia.gov/v2/natural-gas/prod/oilwells/data/?api_key=P8RaabkofwdUzmf5q5NKFj1axbWh70yWKQ4mZVYt&data[]=value";

const response = await fetch(api_url); 
var data = await response.json();
let oilWellData = [];
var arrSize = data['response']['data'].length;

for(let i = 0; i < arrSize; i++) {
    if (data['response']['data'][i]['period'] == 2020 && data['response']['data'][i]['value'] != null && data['response']['data'][i]['value'] != 0 && data['response']['data'][i]['area-name'] != "NA") {
        let oilWell = [data['response']['data'][i]['period'], data['response']['data'][i]['area-name'], data['response']['data'][i]['value']] ;
        oilWellData.push(oilWell);
    }
}

export function getLabels() {
    let sendOilStuff = [];
    let sendOilLabels = [];
    let sendOilData = [];
    for(let i = 0; i < oilWellData.length; i++) {
        sendOilLabels[i] = oilWellData[i][1];
    }
    for(let i = 0; i < oilWellData.length; i++) {
        sendOilData[i] = oilWellData[i][2];
    }
    sendOilStuff[0] = sendOilLabels;
    sendOilStuff[1] = sendOilData;

    return sendOilStuff;
}

export function getStateLabels(state) {
    let stateD = [];
    for(let i = 0; i < arrSize; i++) {
        if (data['response']['data'][i]['area-name'] == state && data['response']['data'][i]['period'] >= 2012) {
            stateD.push([data['response']['data'][i]['period'], data['response']['data'][i]['value']]);
        }
    }
    const stateData = stateD.sort((a, b) => a[0] - b[0])

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





