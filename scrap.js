var request = require('request'),
	cherio = require('cheerio'),
	url;

module.exports.getDiputadosAll = function(callback) {
	url = "http://sitl.diputados.gob.mx/LXII_leg/listado_diputados_gpnp.php?tipot=";
	var diputados = [];
	request({
		url: url,
		enconding: 'binary'
	}, function(err, res, body) {
		if (!err && res.statusCode === 200) {
			var $ = cherio.load(body);
			var tb = $($('table')[0]).find('tr');
			var x = $(tb).find('table')[1];
			var filas = $(x).find('tr')
			filas.each(function() {
				if ($(this).find('td a')) {
					id_diputado = $(this).find('a').attr('href');
					if (typeof id_diputado != "undefined") {
						id_diputado = id_diputado.replace('curricula.php?dipt=', '');
						nombre_diputado = $(this).find('a').text();

						diputados.push({
							id_diputado: id_diputado,
							nombre_diputado: nombre_diputado,
						});
					}
				}
			})
		}
		callback(diputados);
	});
};

module.exports.getDiputado = function(id, callback) {
	url = "http://sitl.diputados.gob.mx/LXII_leg/curricula.php?dipt=" + id;
	var datos = [];
	request({
		url: url,
		enconding: 'binary'
	}, function(err, res, body) {
		if (!err && res.statusCode === 200) {
			var $ = cherio.load(body);
			var tb = $($('table')[0]).find('tr')[2];
			var x = $(tb).find('table')[1];
			var filas = $(x).find('tr')
			//filas.each(function() {
				entidad_n = $($(x).find("tr")[2]).text().split(":")[1];
				tipo_de_eleccion = $($(x).find("tr")[1]).text().split(":")[1];
				distrito = $($(x).find("tr")[3]).text().split(":")[1];
				cabecera = $($(x).find("tr")[4]).text().split(":")[1];
				curul = $($(x).find("tr")[5]).text().split(":")[1];
				suplente = $($(x).find("tr")[6]).text().split(":")[1];
				onomastico = $($(x).find("tr")[7]).text().split(":")[1];
				email = $($(x).find("tr")[8]).text().split(":")[1];
				datos.push({
					entida:entidad_n,
					eleccion:tipo_de_eleccion,
					distrito:distrito,
					cabecera:cabecera,
					carul:curul,
					suplente:suplente,
					onomastico:onomastico,
					email:email
				});
			//});
		}
		callback(datos);
	});
};