
class OpenStreetMap {

    static map;
    static popup;

    static initMap(lat, lon) {
        var macarte = L.map('map').setView([lat, lon], 11);

        var theme = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
        var i = 0;

        var markerClusters; // Servira à stocker les groupes de marqueurs
        OpenStreetMap.popup = L.popup();

        OpenStreetMap.map = macarte;

        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);



        markerClusters = L.markerClusterGroup; // Nous initialisons les groupes de marqueurs
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer(theme, {
            // Il est toujours bien de laisser le lien vers la source des données
            //attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);
        macarte.on('click', OpenStreetMap.onMapClick);

    }





    static onMapClick(e) {

        var latlng = e.latlng.lat + ',' + e.latlng.lng;

        OpenStreetMap.popup
            .setLatLng(e.latlng)
            .setContent('<button value="' + latlng + '" class="btn btn-primary" onClick="openModal(this)">Ajouter</button> ')
            .openOn(OpenStreetMap.map);

        var marker = L.marker(e.latlng).addTo(OpenStreetMap.map);
    }


}

