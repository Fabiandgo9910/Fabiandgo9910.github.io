function mostrarSelect(opcion) {
  if (opcion === 'pool') {
    document.getElementById('pool').style.display = 'block';
    document.getElementById('house').style.display = 'none';
  } else if (opcion === 'house') {
    document.getElementById('pool').style.display = 'none';
    document.getElementById('house').style.display = 'block';
    document.getElementById('house_select').disabled=false
  }
}