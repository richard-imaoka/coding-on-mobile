let item = function(text, input) {
  let split = text.split(",");
  let colorHex = split[0]
  let colorName = split[split.length - 1];
  let element = document.createElement("li");
  element.innerHTML = colorHex + " " + colorName;
  element.style.backgroundColor = colorHex;
  return element;
}

class CSSData {

  constructor(){
    this.colors={};
    this.loadColors();
  }

  getColors(){
    return this.colors;
  }

  loadColors(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "../../src/data/awesomplete-colors.json", true);
    let self = this;
    ajax.onload = function () {
      self.colors = JSON.parse(ajax.responseText);
    }
    ajax.send();
  }

  getData(propertyName){
    const funcMap = {
      'background-color': this.getColors.bind(this)
    };

    const getterFunc = funcMap[ propertyName ];
    if( getterFunc === undefined ){
      console.log( 'no CSS Data defined for proeprty name = ' + propertyName + ', returning an JavaScript empty object.' );
      return({});
    }
    else{
      const retVal = getterFunc();

      if(retVal === {}){
        console.log( 'Ajax CSS Data for proeprty name = ' + propertyName + ', is pending or failed. Returning an empty JavaScript object' );
        return ({});
      }
      else
        return retVal;
    }
  }

  getRenderItem(propertyName) {
    const funcMap = {
      'background-color': item
    };
    return funcMap[propertyName];
  }
}

let CSSDataSingleton = new CSSData();
export default CSSDataSingleton;
