function coinrate(valNum) {
  if (converter.usd.value <= 0)
  window.alert ('');
    else {
      document.getElementById('euro').value = (valNum/23);
      document.getElementById('btc').value = (valNum/53);
    }
  }
