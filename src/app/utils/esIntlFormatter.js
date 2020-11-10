export const esIntlFormatter = new Intl.NumberFormat('es-ES');
export const esIntlDate = new Intl.DateTimeFormat('es-ES');

export const formatDate = function(date = new Date()){
	return esIntlDate.format(date);
}