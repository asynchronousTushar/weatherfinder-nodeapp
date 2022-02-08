const searchForm = document.querySelector(".search-form");
const input = document.querySelector(".search-form .search-value");
const result = document.querySelector(".result");

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    result.innerHTML = '<div style="text-align: center; color: grey; font-size: 30px;">Loading...</div>'

    fetch('/weather?address=' + input.value)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (!data) {
                console.log(data)
            } else {
                result.innerHTML = '<strong>Location:</strong> <span>' + data.response.location.name + '</span><br><strong>Country:</strong> <span>' + data.response.location.country + '</span><br><strong>Local Time:</strong> <span>' + data.response.location.localtime + '</span><br><strong>Latitude:</strong> <span>' + data.response.location.lat + '</span><br><strong>Longitude:</strong> <span>' + data.response.location.lon + '</span><br><strong>Condition:</strong> <span>' + data.response.current.condition.text + '</span><br><strong>Temp(feels like):</strong> <span>' + data.response.current.feelslike_c + ' degree Celsius' + '</span><br><strong>Temp(real):</strong> <span>' + data.response.current.temp_c + ' degree Celsius' + '</span><br><strong>Wind direction:</strong> <span>' + data.response.current.wind_dir + '</span><br><strong>Wind speed:</strong> <span>' + data.response.current.wind_kph + 'km/h' + '</span> <br>';

                input.value = ''
            }
        })
        .catch((error) => {
            result.innerHTML = '<div style="color: red; text-align: center; font-size: 30px;">Something went wrong!</div>';

            input.value = '';
        })
})