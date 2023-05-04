const tablaHash = new TablaHash()
const inputElement = document.getElementById("input");
localStorage.getItem("estudianteTablaHash");
inputElement.addEventListener("change", onChange, false);
function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoad(event) {

    var obj = JSON.parse(event.target.result);
    for (var i = 0; i < obj.alumnos.length; i++) {

        tablaHash.insertar(obj.alumnos[i].carnet, obj.alumnos[i].nombre, sha256(obj.alumnos[i].password).toString())
    }
    console.log(tablaHash.tabla)
    tablaHash.genera_tabla()
}

function busqueda() {
    let carnet = document.getElementById("valor").value;
    tablaHash.busquedaUsuario(carnet)
}