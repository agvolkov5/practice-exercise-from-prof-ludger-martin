const $blue = document.getElementById('blue');

successCallback = (position) => {
    $blue.innerText = 'Lat: ' + position.coords.latitude +
                        '\nLog: ' + position.coords.longitude +
                        '\nH: ' + position.coords.altitude;
};

errorCallback = (error) => {
    console.log(error);
    $blue.innerText = 'Ehh.. You don\'t allow permission for GPS :(';
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
