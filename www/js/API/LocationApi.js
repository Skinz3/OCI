class LocationApi {

    static async search(keyword, lat, long, radius) {
        var response = await fetch("https://photon.komoot.io/api/?q=" + keyword + "&limit=" + radius + "&lat=" + lat + "&lon=" + long);
        var json = await response.json();
        return json.features;

    }

    // Care about API quota restrictions
    static async getCoordinatesData(lat, long) {
        var response = await fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + long + "&zoom=18&addressdetails=1");
        var json = await response.json();
        return json;
    }


}