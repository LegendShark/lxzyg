'use strict';

var url = 'https://mp.ziyouswim.com/api/';

function fetchProvince(okCallback, errCallback) {
  axios.get(url + 'supplier/district').then(function (resp) {
    if (resp.data.code > 200) {
      if (errCallback) {
        errCallback(res.data.message);
      }
    } else {
      okCallback(resp.data.data);
    }
  });
}

function fetchCity(provinceId, okCallBack, errCallback) {
  axios.get(url + 'supplier/district/city?provinceId=' + provinceId).then(function (res) {
    if (res.data.code > 200) {
      if (errCallback) {
        errCallback(res.data.message);
      }
    } else {
      okCallBack(res.data.data);
    }
  });
}

function setContactEvents() {
  var contact = document.getElementById('contact');
  if (!contact) {
    return;
  }

  var province = document.getElementById('c-province');
  var city = document.getElementById('c-city');
  fetchProvince(function (provinces) {
    for (var i = 0; i < provinces.length; i++) {
      province.options[i + 1] = new Option(provinces[i].fullname, provinces[i].id);
    }
  });
  province.addEventListener('change', function (e) {
    fetchCity(e.target.value, function (cities) {
      city.options.length = 1;
      for (var i = 0; i < cities.length; i++) {
        city.options[i + 1] = new Option(cities[i].fullname, cities[i].id);
      }
    });
  });

  var submit = document.getElementById('c-submit');
  submit.addEventListener('click', function () {
    var province = document.getElementById('c-province');
    var city = document.getElementById('c-city');
    var name = document.getElementById('c-name');
    var phone = document.getElementById('c-phone');
    var check1 = document.getElementById('c-check-1');
    var check2 = document.getElementById('c-check-2');
    var check3 = document.getElementById('c-check-3');
    var check4 = document.getElementById('c-check-4');
    name = name.value.trim();
    phone = phone.value.trim();
    if (!province.options[province.selectedIndex].value) {
      alert('请选择所在省份！');
      return;
    }
    if (!city.options[city.selectedIndex].value) {
      alert('请选择所在城市！');
      return;
    }
    if (!name) {
      alert('姓名不能为空！');
      return;
    }
    if (!phone) {
      alert('电话不能为空！');
      return;
    }
    if (!/^1[0-9]{10}$/.test(phone)) {
      alert('电话需要填写手机号码！');
      return;
    }

    var content = [];
    content.push('省份：' + province.options[province.selectedIndex].text);
    content.push('城市：' + city.options[city.selectedIndex].text);
    var checks = [];
    if (check1.checked) {
      checks.push('费用详情');
    }
    if (check2.checked) {
      checks.push('投资政策');
    }
    if (check3.checked) {
      checks.push('成本利润');
    }
    if (check4.checked) {
      checks.push('最新优惠');
    }
    content.push('想要获取：' + (checks.join('，') || '无'));

    axios.post('https://1237987528716338.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/lxzyg/form/', {
      name: name,
      phone: phone,
      content: content.join('\n')
    }).then(function () {
      alert('已收到您的信息，稍后会有顾问与您联系，请保持手机通畅，谢谢！');
    }).catch(function () {
      alert('网络错误，请稍后再试！');
    });
  });
}

window.onload = function () {
  setContactEvents();
};
