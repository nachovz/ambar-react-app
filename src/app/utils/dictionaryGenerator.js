const dictionaryGenerator = ( data, key, value, name) => {

  var dictionary = {};
  data.forEach(element => {
    if(!!element[key[0]]){
      if(!dictionary[element[key[0]]]){
        dictionary[element[key[0]]] = {
          name: element[key[0]],
          Qty: parseInt(element[value])
        }
      }else{
        dictionary[element[key[0]]].Qty += parseInt(element[value])
      }
    }else{
      if(!dictionary[element[key[1]]]){
        dictionary[element[key[1]]] = {
          name: element[key[1]],
          Qty: parseInt(element[value])
        }
      }else{
        dictionary[element[key[1]]].Qty += parseInt(element[value])
      }
    }
  });

  return Object.values(dictionary);
}

export default dictionaryGenerator;