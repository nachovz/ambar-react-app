import { 
	TIPOS_RECOGIDAS, 
	RECOGIDA, 
	SERVICIO, 
	ENTREGA, 
	CONSIGNA, 
	//SERVFACT 
} from "app/constants/values";

const dictionaryGenerator = ( data ) => {
  var dictionary = {}; // { name, qty, type}
  data.forEach(element => {
		
		let filtered = {
			name: "",
			value: ""
		};

    switch (TIPOS_RECOGIDAS[element.projcategoryid.toLowerCase()]) {
			case RECOGIDA:
				filtered.name = "packingmaterialname";
				filtered.value = "res_qty_env";
				break;
			
			case SERVICIO:
				filtered.name = "packingmaterialname";
				filtered.value = "res_qty_env";
				break;
		
			case CONSIGNA:
				filtered.name = "packingmaterialname";
				filtered.value = "res_qty_env";
				break;
			
			case ENTREGA:
				filtered.name = "itemname";
				filtered.value = "weight";
				break;
			
			default:
				break;
		}

		if(element[filtered.name] in dictionary){
				dictionary[element[filtered.name]].qty += parseFloat(element[filtered.value]);
			}else{
				dictionary[element[filtered.name]] = {
					name: element[filtered.name],
					qty: parseFloat(element[filtered.value]),
					type: TIPOS_RECOGIDAS[element.projcategoryid.toLowerCase()]
				}
			}
  });

  return Object.values(dictionary);
}

/*const dictionaryGenerator = ( data, key, value, name) => {

  var dictionary = {};
  data.forEach(element => {
    if(!!element[key[0]]){
      if(!dictionary[element[key[0]]]){
        dictionary[element[key[0]]] = {
          name: element[key[0]],
          Qty: parseInt(element[value[0]])
        }
      }else{
        dictionary[element[key[0]]].Qty += parseInt(element[value[0]])
      }
			console.log(element.projcategoryid, element, dictionary[element[key[0]]])
    }else{
      if(!dictionary[element[key[1]]]){
        dictionary[element[key[1]]] = {
          name: element[key[1]],
          Qty: parseInt(element[value[1]])
        }
      }else{
        dictionary[element[key[1]]].Qty += parseInt(element[value[1]])
      }
			console.log(element.projcategoryid, element, dictionary[element[key[1]]])
    }
  });

  return Object.values(dictionary);
}*/

export default dictionaryGenerator;