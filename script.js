//definicja obiektu mapy z współrzędnymi dla wybranego obszaru
var map = L.map('map').setView([52.1768, 15.9399], 14);		

//dodanie warstwy osm
var osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
{	
	maxZoom: 18,
	attribution: "Źródło danych: OpenStreetMap"
}).addTo(map);

//dodanie zmiennej adresu geoportalu
var orto_url = "https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/StandardResolution";

var orto = L.tileLayer.wms(orto_url, {
	layers: 'Raster',
	format: 'image/png',
	attribution: "Źródło danych: Geoportal",
	maxZoom: 18
});

/*var D = L.tileLayer.wms(ms_url, {
	layers: 'inz:D',
	format: 'image/png',
	zIndex: 1,
	transparent: true, //przeźroczystość
	opacity: 0.6
});

var Dz = L.tileLayer.wms(ms_url, {
	layers: 'inz:Dz',
	format: 'image/png',
	zIndex: 1,
	transparent: true, //przeźroczystość
	opacity: 0.6
});

var s2 = L.tileLayer.wms(ms_url, {
	layers: 'inz:s2',
	format: 'image/png',
	zIndex: 3,
	transparent: true, //przeźroczystość
	//opacity: 1
});

var s3 = L.tileLayer.wms(ms_url, {
	layers: 'inz:s3',
	format: 'image/png',
	zIndex: 3,
	transparent: true, //przeźroczystość
});

var z = L.tileLayer.wms(ms_url, {
	layers: 'inz:z',
	format: 'image/png',
	zIndex: 2,
	transparent: true, //przeźroczystość
});

var w = L.tileLayer.wms(ms_url, {
	layers: 'inz:w',
	format: 'image/png',
	zIndex: 2,
	transparent: true, //przeźroczystość
});

var Dz3k1 = L.tileLayer.wms(ms_url, {
	layers: 'inz:Dz3k1',
	format: 'image/png',
	zIndex: 2,
	transparent: true, //przeźroczystość
});

var G1k = L.tileLayer.wms(ms_url, {
	layers: 'inz:G1k',
	format: 'image/png',
	zIndex: 2,
	transparent: true, //przeźroczystość
	opacity: 0.6
});

var Pg1 = L.tileLayer.wms(ms_url, {
	layers: 'inz:Pg1',
	format: 'image/png',
	zIndex: 2,
	transparent: true, //przeźroczystość
	opacity: 0.6
});

var wykopy = L.tileLayer.wms(ms_url, {
	layers: 'inz:wykopy',
	format: 'image/png',
	zIndex: 4,
	transparent: true, //przeźroczystość
});*/
	
//dodanie kontrolki pozycji myszki
var pozycja = L.control.coordinates({position:"bottomright"}).addTo(map);

//dodanie kontrolki skali mapy
var skala = L.control.scale({imperial: false}).addTo(map);

//dodanie wyszukiwarki miejscowosci
L.Control.geocoder({
  defaultMarkGeocode: true,
  placeholder: 'Szukaj miejscowości...',
  position: 'topleft'
}).addTo(map);

//FUNKCJA GEOLOKALIZACJI
var geolokalizacja = L.control.locate({
	position: 'topleft',  // set the location of the control
	setView: false, // automatically sets the map view to the user's location, enabled if `follow` is true
	keepCurrentZoomLevel: true, // keep the current map zoom level when displaying the user's location. (if `false`, use maxZoom)
	locateOptions: {
		showPopup: true, // display a popup when the user click on the inner marker
	}  // define location options e.g enableHighAccuracy: true or maxZoom: 10
}).addTo(map); // WSTAWIENIE FUNKCJI GEOLOKALIZACJI Z IKONY

$(document).ready(function(){
	$("#menu").click(function(){
		$("#menu_res").slideToggle("slow");
	});
});

$( "#menu_res" ).click(function( event ) {
	layerClicked = window[event.target.value];
	if (map.hasLayer(layerClicked)) {
		map.removeLayer(layerClicked);
	}
	else {
		map.addLayer(layerClicked);
	};
});

$("#sat_view").click(function() {
	if (map.hasLayer(osm)) {
		map.removeLayer(osm);
		map.addLayer(orto);
		orto.bringToBack();
	}
});

$("#map_view").click(function() {
	if (map.hasLayer(orto)) {
		map.removeLayer(orto);
		map.addLayer(osm);
		osm.bringToBack();
	}
});		




