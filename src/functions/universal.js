var TEST_ENVIRONMENT = "http://127.0.0.1:5000";
var PROD_ENVIRONMENT = "http://bytefrost.sytes.net:5000";
export var DEFAULT_ENDPOINT = TEST_ENVIRONMENT;

export function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString();
	var split       = number_string.split(',');
	var sisa        = split[0].length % 3;
	var rupiah      = split[0].substr(0, sisa);
	var ribuan      = split[0].substr(sisa).match(/\d{3}/gi);
	var separator;

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}