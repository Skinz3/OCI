class KomootApi
{
    static async search(keyword,lat,long,radius)
    {
        var response = await fetch("https://photon.komoot.io/api/?q="+keyword+"&limit="+radius+"&lat="+lat+"&lon="+long);
        var json = await response.json();
        console.log(json.features);
        return json.features;

    }
}