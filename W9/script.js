function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  if (!city) {
    result.innerHTML = "Please select a city!";
    return;
  }
  result.innerHTML = "Fetching data...";

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      // 4 means the request is complete
      if (xhttp.status === 200) {
        const weather = JSON.parse(xhttp.responseText)[city];
        result.innerHTML = weather
          ? `<b>Temperature:</b> ${weather.temp}<br><b>Humidity:</b> ${weather.humidity}<br><b>Condition:</b> ${weather.condition}`
          : "City data not found!";
      } else {
        result.innerHTML = "Error fetching data.";
      }
    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();
}
