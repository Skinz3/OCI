
class Map{

    static map;
    static popup;

    static initMap(lat,lon)
    {
        var  macarte = L.map('map').setView([lat, lon], 11);
        
        var theme = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
    var i = 0;

    var markerClusters; // Servira à stocker les groupes de marqueurs
    Map.popup = L.popup();

    Map.map = macarte;
        
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 1,
                maxZoom: 20}).addTo(macarte);


 
    markerClusters = L.markerClusterGroup; // Nous initialisons les groupes de marqueurs
  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer(theme, {
      // Il est toujours bien de laisser le lien vers la source des données
      //attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
      minZoom: 1,
      maxZoom: 20
  }).addTo(macarte);
    macarte.on('click', Map.onMapClick); 
    
}
    

 


static onMapClick(e) {
    Map.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(Map.map);
    var marker = L.marker(e.latlng).addTo(Map.map);
}
}

