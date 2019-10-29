const dictionaryGenerator = ( data, key, value, name) => {

  var dictionary = {};

  data.forEach(element => {

    if(!dictionary[element[key]]){
      dictionary[element[key]] = {
        name: element[name],
        qty: parseInt(element[value])
      }
    }else{
      dictionary[element[key]].qty += parseInt(element[value])
    }
  });

  return dictionary;
}

export default dictionaryGenerator;