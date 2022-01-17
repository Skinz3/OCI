class Geolocation 
{
  static coords = null;

  static initialize()
  {
      Geolocation.getWebLocation();
  }
  static requestPermissions() {
    var successCallback = function () {
      console.log("permission required");
    };
    var errorCallback = function () {
      console.log("permission denied");
    };

    var permissions = cordova.plugins.permissions;
    permissions.requestPermissions(
      permissions.ACCESS_FINE_LOCATION,
      successCallback,
      errorCallback
    );
    permissions.requestPermissions(
      permissions.ACCESS_COARSE_LOCATION,
      successCallback,
      errorCallback
    );
    permissions.requestPermissions(
      permissions.ACCESS_BACKGROUND_LOCATION,
      successCallback,
      errorCallback
    );

  }

  static getWebLocation()
  {
    var showPosition = function (position) 
    {
      Geolocation.coords = position.coords;
    };
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else
     {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
}
