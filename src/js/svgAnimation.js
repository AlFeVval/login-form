let colorStripes = {
    colorA:"#FF0000",
    colorB:"#00FF00",
    colorC:"#0000FF"

};
const cleanString = (rawString)=>{
    let index = 0;

    for (char of rawString){
        if (char==='.'){
            rawString = rawString.substring(0,index) + rawString.substring(index+1);
        }
        index++;
    }
    if (rawString.length <3){
        rawString = '0' + rawString;
    }
    return rawString;
}

const getDataFromInputBox = ()=>{
    let data = parseFloat(document.getElementById('inputOMS').value);
    console.log(data)
    updateSVG(data);
}

const updateSVG = (oms)=>{
    console.log(colorStripes)
     let svgObject =document.getElementById("svgObject").contentDocument;
     let colorStripe1 = svgObject.getElementById("blockA");
     let colorStripe2 = svgObject.getElementById("blockB");
     let colorStripe3 = svgObject.getElementById("blockC");
     getColorNumbers(oms);

    colorStripe1.style.fill = colorStripes.colorA;
    colorStripe2.style.fill = colorStripes.colorB;
    colorStripe3.style.fill = colorStripes.colorC;
}


const getColorNumbers = (oms)=>{
    let colorList = ["#272727", "#C84331","#FF002E", "#FF9E1D","#EFE017","#008037","#004AAD","#CB6CE6","#737373",
        "#F6F6E9", "#FFDD2D","#A6A6A6"];

    let cleanOms = cleanString(oms.toString());
    let number1 = cleanOms[0];
    let number2 = cleanOms[1];
    let number3 = (oms,cleanOms)=>{
        if (oms < 1 && oms>0.01){
            return -1;
        }
        if (oms < 0.1 ){
            return -2;
        }
        return cleanOms.slice(2).length;

    }
    colorStripes.colorA = colorList[number1];
    colorStripes.colorB = colorList[number2];
    colorStripes.colorC = colorList[number3(oms,cleanOms)];


}

a = cleanString(".01");
console.log(a)