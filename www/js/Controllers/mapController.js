
currentResults = []
searchMarkers = []

function clearMarkers() {
  searchMarkers.forEach(function (marker) {
    OpenStreetMap.map.removeLayer(marker);
  });

  searchMarkers = []
}


function clearResults() {
  clearMarkers();
  currentResults = []
  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild);
  }

}
async function onSearchClick() {

  clearResults();
  var searchText = document.getElementById("searchbar").value;
  var resultList = document.getElementById("resultList");



  var lat = Geolocation.coords.latitude;
  var long = Geolocation.coords.longitude;

  if (searchText == "") {
    cuteAlert({
      type: "warning",
      title: "Veuillez Saisir un centre d'interet",
      message: "Champs de saisie vide",
      buttonText: "Okay",
      img: "../img/warning.svg",
    });

    return;
  }

  var results = await LocationApi.search(searchText, lat, long, 10);

  var but_enreg = document.createElement('button');
  but_enreg.setAttribute("class", "btn btn-secondary btn-sm");
  but_enreg.setAttribute("data-bs-toggle","modal");
  but_enreg.setAttribute("data-bs-target","#myModal2");
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

        ++z;
        appendResult(data.description, data.numero, data.rue, data.ville, data.latitude, data.longitude, z, resultList);
      }
    });

  })
}
function displayList(){
  $('#myModal').modal('show');
  db.collection("lists").where("targetUser", "==", Session.user.uid).get().then((docs) => {

    docs.forEach(function (child) {

      var data = child.data();
      document.getElementById("myUL").appendChild(createItem(data.name));

    });

  })


}
function createItem(value) {

  var li = document.createElement("li");
  li.className = 'item'
  li.innerHTML =
    `<div class="p-2 rounded checkbox-form">
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault-1">
  ${value}
  </div>
  </div>`;
  return li;

}

function addItem() {

  var myDiv = document.getElementById("myDiv");
  var inputValue = document.getElementById("myInput").value;

  var checkbox = document.createElement('input');
  if (inputValue === '') {
    cuteAlert({
      type: "warning",
      title: "Please give a name to the list",
      message: "Empty input fields",
      buttonText: "Okay",
      img: "../img/warning.svg",
    });

    return;
    
  } else {
   
    db.collection("lists").add({
      name: inputValue,
      targetUser: Session.user.uid,
      value: [],
    });
    document.getElementById("myUL").appendChild(createItem(inputValue));
    cuteAlert({
      type: "success",
      title: "List successfully added ",
      message: "List successfully added",
      img: "../img/success.svg",
    })
  }
}



function removeItem() {
  var doc = document.querySelectorAll('.item');
  doc.forEach(x => {
    if (x.querySelector('input').checked) {
      x.remove()
      console.log(x.innerHTML);
    }
  })

  cuteAlert({
    type: "success",
    title: "List successfully deleted ",
    message: "List successfully deleted",
    img: "../img/success.svg",
  })
  
}

function appendResult(name, houseNumber, street, city, lat, lon, z, resultList) {

  var nom = document.createElement('a');
  nom.setAttribute("class", "list-group-item clearfix");
  nom.setAttribute("id", z);
  nom.innerHTML = "<b>" + name + "</b></br>" + houseNumber + " " + street + ", " + city;
  var t = document.createElement('span');
  t.setAttribute("class", "pull-right");

  var icon = document.createElement('i');
  icon.setAttribute("class", "far fa-star");
  icon.setAttribute("id", "star" + z);
  icon.setAttribute("title", "Add to favorite");
  icon.setAttribute("onClick", "addToFavorite(id)");

  var icon1 = document.createElement('i');
  icon1.setAttribute("class", "fas fa-map-marker-alt");
  icon1.setAttribute("style", "color:red");
  icon1.setAttribute("id", "star" + z);
  icon1.setAttribute("title", "Itinéraire");
  icon1.setAttribute("onClick", "window.open('https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon + "')", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=500");

  resultList.appendChild(nom);

  nom.appendChild(t);
  t.appendChild(icon);
  t.appendChild(document.createTextNode(" "));
  t.appendChild(icon1);

  // alert(OpenStreetMap.map);
  var marker = L.marker([lat, lon]).addTo(OpenStreetMap.map).bindPopup(name);

  const element = {
    houseNumber: houseNumber,
    street: street,
    city: city,
    name: name,
    latitude: lat,
    longitude: lon,
  };

  currentResults.push(element);
  searchMarkers.push(marker);
}
function addToFavorite(f) {

  var star = document.getElementById(f);
  var index = star.parentNode.parentNode.id;
  var value = currentResults[index - 1];

  console.log(value);

  if (star.className == "far fa-star") {

    db.collection("favoris").add({
      targetUser: Session.user.uid,
      description: value.name,
      numero: value.houseNumber == undefined ? null : value.houseNumber,
      ville: value.city == undefined ? null : value.city,
      rue: value.street == undefined ? null : value.street,
      latitude: value.latitude,
      longitude: value.longitude,
    });
    cuteAlert({
      type: "success",
      title: "Location added to Favourites",
      message: "Location " + $('#description').val() + " successfully added to Favourites",
      img: "../img/success.svg",
    })
    star.setAttribute("class", "fas fa-star");
    star.setAttribute("title", "Remove from favorite");
  } else {
    star.setAttribute("class", "far fa-star");
    star.setAttribute("title", "Add to favorite");
  }
  document.getElementById("star" + index).addEventListener("onClick", addToFavorite);
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
    targetUser: Session.user.uid,
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
    title: "Location added",
    message: "Location " + $('#description').val() + " successfully added",
    buttonText: "Okay",
    img: "../img/success.svg",
  })
}
function displayFavorites() {
  console.log("btn clickable");
  clearResults();
  var resultList = document.getElementById("resultList");
  var z = 0;
  db.collection("favoris").where("targetUser", "==", Session.user.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var document = doc.data();

        appendResult(document.description, document.numero, document.rue, document.ville, document.latitude, document.longitude, z++, resultList);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


}

