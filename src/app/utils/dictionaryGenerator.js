const dictionaryGenerator = ( data, key, value, name) => {

  var dictionary = {};

  data.forEach(element => {
    if(!!element[key]){
      if(!dictionary[element[key]]){
        dictionary[element[key]] = {
          name: element[name],
          Qty: parseInt(element[value])
        }
      }else{
        dictionary[element[key]].Qty += parseInt(element[value])
      }
    }
  });

  return dictionary;
}

export default dictionaryGenerator;