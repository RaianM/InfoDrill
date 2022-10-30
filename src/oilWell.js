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





