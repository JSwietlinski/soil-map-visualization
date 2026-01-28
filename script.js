//definicja obiektu mapy z współrzędnymi dla wybranego obszaru
var map = L.map('map', {
	zoomAnimation: true,
    fadeAnimation: true,
    markerZoomAnimation: true
}).setView([52.1768, 15.9399], 14);		

//dodanie warstwy osm
var osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',{	
	maxZoom: 18,
	attribution: "Źródło danych: OpenStreetMap"
}).addTo(map);

//dodanie zmiennej adresu geoportalu
var orto_url = "https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/StandardResolution";
var orto = L.tileLayer.wms(orto_url, {
	layers: 'Raster',
	format: 'image/png',
	attribution: "Źródło danych: Geoportal",
	transparent: true,
    version: '1.1.1', 
    updateWhenIdle: true,
    updateWhenZooming: false,
	maxZoom: 18
});

// Ładowanie plików GeoJSON dla wykopów(punkty)
var wykopyLayer = L.layerGroup(); 

$.getJSON("data/wykopy.geojson", function(data) {
    var geojson = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var wykopIcon = L.icon({
                iconUrl: 'images/wykopy.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });
            return L.marker(latlng, {icon: wykopIcon});
        }
    });
    // Dodajemy dane do grupy, ale NIE do mapy
    wykopyLayer.addLayer(geojson); 
});

// Ładowanie plików GeoJSON dla gleb (poligony)
var glebyLayers = {};

function loadgleby(code, color) {
    glebyLayers[code] = L.layerGroup();
    $.getJSON("data/" + code + ".geojson", function(data) {
        var geojson = L.geoJson(data, {
            style: {
                color: "#333",
                weight: 1,
                fillColor: color,
                fillOpacity: 0.6
            }
        });
        glebyLayers[code].addLayer(geojson);
    });
}

// WYWOŁANIE ŁADOWANIA DLA WSZYSTKICH WARSTW
loadgleby("D", "#8d643a");
loadgleby("Dz", "#b99061");
loadgleby("G1k", "#9da1a4");
loadgleby("Pg1", "#444df4");
loadgleby("s2", "#b99061"); 
loadgleby("s3", "#e3c191");
loadgleby("z", "#7d7d7d");
loadgleby("w", "#ffffff");
loadgleby("Dz3k1", "#b99061");


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

// obsługa menu i checkboxów
$(document).ready(function(){
	$("#menu").click(function(){
		$("#menu_res").slideToggle("slow");
	});
});

$( "#menu_res input" ).click(function( event ) {
    var val = $(this).val(); 
    
    if (val === "wykopy") {
        toggleLayer(wykopyLayer);
    } else if (glebyLayers[val]) {
        toggleLayer(glebyLayers[val]);
    }
});

/*$( "#menu_res" ).click(function( event ) {
	layerClicked = window[event.target.value];
	if (map.hasLayer(layerClicked)) {
		map.removeLayer(layerClicked);
	}
	else {
		map.addLayer(layerClicked);
	};
*/

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

function toggleLayer(layer) {
    if (map.hasLayer(layer)) {
        map.removeLayer(layer);
    } else {
        map.addLayer(layer);
        if (layer === wykopyLayer) {
            wykopyLayer.getLayers().forEach(function(l) {
                if (l.bringToFront) l.bringToFront();
            });
        }
    }
}



