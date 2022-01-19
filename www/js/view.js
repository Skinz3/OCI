
async function onSearchClick() {

  var searchText = document.getElementById("searchbar").value;
  var resultList = document.getElementById("resultList");

  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild);
  }

  var lat = Geolocation.coords.latitude;
  var long = Geolocation.coords.longitude;

  var results = await LocationApi.search(searchText, lat, long, 10);

  var but_enreg = document.createElement('button');
  but_enreg.setAttribute("class", "btn btn-secondary btn-sm");
  but_enreg.textContent = 'Enregistrer Liste';
  but_enreg.style.width = '150px';


  var z = 0;


  resultList.append(but_enreg);

  results.forEach(element => {

    var lat = element.geometry.coordinates[1];
    var lon = element.geometry.coordinates[0];
    ++z;

    appendResult(element.properties.name,
      element.properties.housenumber,
      element.properties.street,
      element.properties.city,
      lat,
      lon,
      z, resultList);

  });

  db.collection("locations").get().then((docs) => {

    docs.forEach(function (child) {

      var data = child.data();
      if (data.description.toLowerCase().includes(searchText.toLowerCase())) {


        appendResult(data.description, data.numero, data.rue, data.ville, data.latitude, data.longitude, z, resultList);
      }
    });

  })



}
function appendResult(name, houseNumber, street, city, lat, lon, z, resultList) {
  var nom = document.createElement('a');
  nom.setAttribute("class", "list-group-item clearfix");
  nom.innerHTML = "<b>" + name + "</b></br>" + houseNumber + " " + street + ", " + city;
  var t = document.createElement('span');
  t.setAttribute("class", "pull-right");

  var icon = document.createElement('i');
  icon.setAttribute("class", "far fa-star");
  icon.setAttribute("id", "star" + z);
  icon.setAttribute("title", "Add to favorite");
  icon.setAttribute("onClick", "myFunction(id)");

  var icon1 = document.createElement('i');
  icon1.setAttribute("class", "fas fa-map-marker-alt");
  icon1.setAttribute("style", "color:red");
  icon1.setAttribute("id", "star" + z);
  icon1.setAttribute("title", "Itinéraire");
  icon1.setAttribute("onClick", "window.open('https://www.google.com/maps/dir/?api=1&destination=" + lon + "," + lat + "')", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=500");

  resultList.appendChild(nom);

  nom.appendChild(t);
  t.appendChild(icon);
  t.appendChild(document.createTextNode(" "));
  t.appendChild(icon1);

  // alert(OpenStreetMap.map);
  var marker = L.marker([lat, lon]).addTo(OpenStreetMap.map).bindPopup(name);
}
function myFunction(f) {
  var star = document.getElementById(f);
  if (star.className == "far fa-star") {
    star.setAttribute("class", "fas fa-star");
    star.setAttribute("title", "Remove from favorite");
  } else {
    star.setAttribute("class", "far fa-star");
    star.setAttribute("title", "Add to favorite");
  }
  document.getElementById("star").addEventListener("onClick", myFunction);
}
async function openModal(e) {
  var lat = e.value.split(",")[0];
  var lon = e.value.split(",")[1];

  var data = await LocationApi.getCoordinatesData(lat, lon); // This can be removed if we exceed API quota

  $('#interetForm').modal('show');

  document.getElementById("lat").value = lat;
  document.getElementById("lon").value = lon;

  document.getElementById("ville").value = data.address.municipality;
  document.getElementById("rue").value = data.address.road;



}
function saveToFirebase() {

  db.collection("locations").add({
    targetUser: Session.user.user.uid,
    description: $('#description').val(),
    numero: $('#numero').val(),
    ville: $('#ville').val(),
    rue: $('#rue').val(),
    latitude: $('#lat').val(),
    longitude: $('#lon').val(),

  }

  );
  cuteAlert({
    type: "success",
    title: "Emplacement ajouté",
    message: "L'emplacement " + $('#description').val() + " a bien été ajouté a la base de donnée.",
    buttonText: "Okay",
    img: "../img/success.svg",
  })
}


