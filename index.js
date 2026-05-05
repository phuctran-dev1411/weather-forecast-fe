$(document).ready(function () {
  const VIETNAM_PROVINCES = {
    "An Giang": { lat: 10.5216, lon: 105.1259 },
    "Bà Rịa - Vũng Tàu": { lat: 10.4973, lon: 107.1683 },
    "Bạc Liêu": { lat: 9.2941, lon: 105.7278 },
    "Bắc Giang": { lat: 21.2731, lon: 106.1946 },
    "Bắc Kạn": { lat: 22.147, lon: 105.8348 },
    "Bắc Ninh": { lat: 21.1861, lon: 106.0763 },
    "Bến Tre": { lat: 10.2385, lon: 106.3774 },
    "Bình Dương": { lat: 11.1661, lon: 106.6263 },
    "Bình Định": { lat: 13.782, lon: 109.2197 },
    "Bình Phước": { lat: 11.7517, lon: 106.923 },
    "Bình Thuận": { lat: 10.9333, lon: 108.1 },
    "Cà Mau": { lat: 8.9114, lon: 105.15 },
    "Cao Bằng": { lat: 22.6667, lon: 106.25 },
    "Cần Thơ": { lat: 10.0222, lon: 105.7145 },
    "Đà Nẵng": { lat: 16.0544, lon: 108.2022 },
    "Đắk Lắk": { lat: 12.6667, lon: 108.0333 },
    "Đắk Nông": { lat: 12.0, lon: 107.6917 },
    "Điện Biên": { lat: 21.3833, lon: 103.0167 },
    "Đồng Nai": { lat: 10.9412, lon: 106.8202 },
    "Đồng Tháp": { lat: 10.4608, lon: 105.6358 },
    "Gia Lai": { lat: 13.9833, lon: 108.0 },
    "Hà Giang": { lat: 22.8167, lon: 104.9833 },
    "Hà Nam": { lat: 20.5312, lon: 105.9234 },
    "Hà Nội": { lat: 21.0285, lon: 105.8542 },
    "Hà Tĩnh": { lat: 18.3333, lon: 105.9 },
    "Hải Dương": { lat: 20.9388, lon: 106.3214 },
    "Hải Phòng": { lat: 20.8449, lon: 106.6881 },
    "Hậu Giang": { lat: 9.7828, lon: 105.4711 },
    "Hòa Bình": { lat: 20.8167, lon: 105.3333 },
    "Hưng Yên": { lat: 20.6483, lon: 106.0506 },
    "Khánh Hòa": { lat: 12.2388, lon: 109.1967 },
    "Kiên Giang": { lat: 10.0125, lon: 105.0809 },
    "Kon Tum": { lat: 14.35, lon: 108.0 },
    "Lai Châu": { lat: 22.3833, lon: 103.45 },
    "Lạng Sơn": { lat: 21.8478, lon: 106.7581 },
    "Lào Cai": { lat: 22.4833, lon: 103.9667 },
    "Lâm Đồng": { lat: 11.9465, lon: 108.4419 },
    "Long An": { lat: 10.5333, lon: 106.4 },
    "Nam Định": { lat: 20.4333, lon: 106.1667 },
    "Nghệ An": { lat: 18.6667, lon: 105.6667 },
    "Ninh Bình": { lat: 20.2539, lon: 105.975 },
    "Ninh Thuận": { lat: 11.5667, lon: 108.9833 },
    "Phú Thọ": { lat: 21.3333, lon: 105.2167 },
    "Phú Yên": { lat: 13.0833, lon: 109.3 },
    "Quảng Bình": { lat: 17.4833, lon: 106.6 },
    "Quảng Nam": { lat: 15.5833, lon: 108.0 },
    "Quảng Ngãi": { lat: 15.1167, lon: 108.8 },
    "Quảng Ninh": { lat: 20.95, lon: 107.0833 },
    "Quảng Trị": { lat: 16.75, lon: 107.1833 },
    "Sóc Trăng": { lat: 9.6, lon: 105.9667 },
    "Sơn La": { lat: 21.3333, lon: 103.9 },
    "Tây Ninh": { lat: 11.3, lon: 106.1 },
    "Thái Bình": { lat: 20.45, lon: 106.3333 },
    "Thái Nguyên": { lat: 21.5942, lon: 105.8482 },
    "Thanh Hóa": { lat: 19.8, lon: 105.7667 },
    "Thừa Thiên Huế": { lat: 16.4667, lon: 107.5833 },
    "Tiền Giang": { lat: 10.3541, lon: 106.3571 },
    "Hồ Chí Minh": { lat: 10.7626, lon: 106.6602 },
    "Trà Vinh": { lat: 9.9333, lon: 106.35 },
    "Tuyên Quang": { lat: 21.8167, lon: 105.2167 },
    "Vĩnh Long": { lat: 10.25, lon: 105.9667 },
    "Vĩnh Phúc": { lat: 21.3, lon: 105.6 },
    "Yên Bái": { lat: 21.7167, lon: 104.8833 },
  };

  const $select = $("#province-select");
  const $datetimeInput = $("#datetime");
  const provinceNames = Object.keys(VIETNAM_PROVINCES).sort((a, b) =>
    a.localeCompare(b, "vi"),
  );

  provinceNames.forEach((province) => {
    $select.append(`<option value="${province}">${province}</option>`);
  });

  let rawData = {};
  function fetchWeatherData(provinceName, lat, lon) {    
    const now = new Date();
    const currentDay = String(now.getDate()).padStart(2, '0');
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    let dateApi = `${currentDay}-${currentMonth}-${now.getFullYear()}`;
    let hourApi = now.getHours();
    const dateInputVal = $datetimeInput.val(); 
    if (dateInputVal) {
      const [year, month, day] = dateInputVal.split("-");
      dateApi = `${day}-${month}-${year}`;
    }
    $.ajax({
      url: "http://localhost:5000/api/predict_core",
      type: "GET",
      data: {
        date: dateApi,
        hour: hourApi,
        longitude: lon,
        latitude: lat,
      },
      dataType: "json",
      success: function (data) {
        rawData = data;

        if (rawData && rawData.data) {
          renderTarget(rawData.data);
          renderTabs(rawData.data.weekly_forecast);
        }
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gọi API:", status, error);
        alert("Không thể tải dữ liệu thời tiết, vui lòng thử lại!");
      },
    });
  }

  $select.on("change", function () {
    const selectedProvince = $(this).val();

    if (selectedProvince && VIETNAM_PROVINCES[selectedProvince]) {
      const targetLat = VIETNAM_PROVINCES[selectedProvince].lat;
      const targetLon = VIETNAM_PROVINCES[selectedProvince].lon;
      fetchWeatherData(selectedProvince, targetLat, targetLon);
    }
  });

  $datetimeInput.on("change", function () {
    const selectedProvince = $select.val();

    if (selectedProvince && VIETNAM_PROVINCES[selectedProvince]) {
      const targetLat = VIETNAM_PROVINCES[selectedProvince].lat;
      const targetLon = VIETNAM_PROVINCES[selectedProvince].lon;
      fetchWeatherData(selectedProvince, targetLat, targetLon);
    }
  });
  $select.val("Hồ Chí Minh").trigger("change");

  function getAverage(obj) {
    return (obj.Random_Forest + obj.Linear_Regression + obj.GBT) / 3;
  }

  function renderTarget(data) {
    const target = data.target_data;
    const temp = getAverage(target.temperature_2m).toFixed(1);
    const humid = getAverage(target.relative_humidity_2m).toFixed(0);
    const wind = getAverage(target.wind_speed_10m).toFixed(1);
    const rain = getAverage(target.precipitation).toFixed(1);
    const dateStr = new Date(target.datetime).toLocaleString("vi-VN", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const html = `
            <p class="mb-1 text-light">Mốc dự báo: ${dateStr}</p>
            <h1 class="display-1 fw-bold mb-3">${temp}°C</h1>
            <div class="row text-center border-top border-light border-opacity-25 pt-3 mt-3">
                <div class="col-4">
                    <i class="fa-solid fa-droplet fs-4 mb-1"></i><br>
                    <strong>${humid}%</strong>
                </div>
                <div class="col-4">
                    <i class="fa-solid fa-wind fs-4 mb-1"></i><br>
                    <strong>${wind} km/h</strong>
                </div>
                <div class="col-4">
                    <i class="fa-solid fa-cloud-showers-heavy fs-4 mb-1"></i><br>
                    <strong>${rain} mm</strong>
                </div>
            </div>
            <p class="mt-3 mb-0 small text-light opacity-75">* Dữ liệu là trung bình của Random Forest, Linear Regression và GBT</p>
        `;
    $("#target-section").html(html);
  }

  function renderTabs(forecastList) {
    const groupedData = {};
    forecastList.forEach((item) => {
      const datePart = item.datetime.split(" ")[0];
      if (!groupedData[datePart]) {
        groupedData[datePart] = [];
      }
      groupedData[datePart].push(item);
    });

    let tabHeaders = "";
    let tabContents = "";

    Object.keys(groupedData)
      .sort()
      .forEach((dateKey, index) => {
        const isActive = index === 0 ? "active" : "";
        const showActive = index === 0 ? "show active" : "";
        const tabId = `day-${index}`;

        const dateObj = new Date(dateKey);
        const displayDate = dateObj.toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        });

        tabHeaders += `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ${isActive}" id="${tabId}-tab" data-bs-toggle="tab" 
                        data-bs-target="#${tabId}-content" type="button" role="tab">
                        ${displayDate}
                    </button>
                </li>
            `;

        let rowsHtml = "";
        let cardsHtml = "";
        groupedData[dateKey].forEach((hourItem) => {
          const timeStr24 = hourItem.datetime.split(" ")[1].substring(0, 5);
          const hourInt = parseInt(timeStr24.split(":")[0], 10);
          const ampm = hourInt >= 12 ? "PM" : "AM";
          const hour12 = hourInt % 12 || 12;
          const timeStr = `${hour12} ${ampm}`;

          // Xử lý dữ liệu
          const temp = getAverage(hourItem.temperature_2m).toFixed(0);
          const humid = getAverage(hourItem.relative_humidity_2m).toFixed(0);
          const wind = getAverage(hourItem.wind_speed_10m).toFixed(0);
          const rain = getAverage(hourItem.precipitation).toFixed(1);

          let iconClass =
            hourInt >= 6 && hourInt <= 17
              ? "fa-sun text-warning"
              : "fa-moon text-secondary";
          let conditionText =
            rain > 0.5
              ? "Có mưa"
              : hourInt >= 6 && hourInt <= 17
                ? "Trời nắng"
                : "Trời trong";
          if (rain > 0.5) iconClass = "fa-cloud-showers-heavy text-info";

          cardsHtml += `
                <div class="hourly-card flex-shrink-0 p-3 me-2 rounded-4">
                    <div class="mb-3 text-secondary fw-semibold">${timeStr}</div>
                    <div class="mb-2"><i class="fa-solid ${iconClass} fs-3"></i></div>
                    <h3 class="fw-bold mb-1">${temp}°</h3>
                    <div class="text-secondary small mb-4">${conditionText}</div>
                    
                    <div class="d-flex flex-column gap-2 small fw-medium">
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-droplet text-info me-2 text-center" style="width: 16px;"></i> ${humid}%
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-cloud-rain text-primary me-2 text-center" style="width: 16px;"></i> ${rain} mm
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="fa-solid fa-wind text-secondary me-2 text-center" style="width: 16px;"></i> ${wind} km/h
                        </div>
                    </div>
                </div>
            `;
        });
        tabContents += `
            <div class="tab-pane fade ${showActive}" id="${tabId}-content" role="tabpanel" tabindex="0">
                <div class="d-flex flex-row overflow-x-auto pb-3 pt-2 px-2 hourly-container">
                    ${cardsHtml}
                </div>
            </div>
        `;
      });

    $("#weatherTabs").html(tabHeaders);
    $("#weatherTabContent").html(tabContents);
    $("#province").text(rawData.meta.province_matched);
  }
});
