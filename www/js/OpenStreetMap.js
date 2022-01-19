
const buttonRemove =
    '<button type="button" class="remove">delte marker 💔</button>';

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
        console.log("test");

    }






    static addMarker(e) {
        // Add marker to map at click location
        const markerPlace = document.querySelector(".marker-position");


        const marker = new L.marker(e.latlng, {
            draggable: true
        })
            .addTo(OpenStreetMap.map)
            .bindPopup(buttonRemove);

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

