


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
        macarte.on('click', this.addMarker);

    }

    static addMarker(e) {
        // Add marker to map at click location
        const markerPlace = document.querySelector(".marker-position");

        var latlng = e.latlng.lat + ',' + e.latlng.lng;
        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        const marker = new L.marker(e.latlng, {
            icon: greenIcon
        }).addTo(OpenStreetMap.map).bindPopup('<button type="button" onClick="openModal(this)" value="' + latlng + '" class="btn btn-success">Add Point</button></br></br><button type="button" class="remove btn btn-danger">Remove</button>');


        // event remove marker
        marker.on("popupopen", OpenStreetMap.removeMarker);

        // event draged marker
        marker.on("dragend", OpenStreetMap.dragedMaker);

    }



    // remove marker
    static removeMarker() {
        const marker = this;
        console.log(marker);
        const btn = document.querySelector(".remove");
        btn.addEventListener("click", function () {
            const markerPlace = document.querySelector(".marker-position");
            OpenStreetMap.map.removeLayer(marker);
        });
    }

    // draged
    static dragedMaker() {
        const markerPlace = document.querySelector(".marker-position");

    }



}

