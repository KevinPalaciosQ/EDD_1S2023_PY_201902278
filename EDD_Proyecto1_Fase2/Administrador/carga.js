import { AVLTree, usuario_estudiante } from "../JavaScript/AVL.js"
// get the form
const form = document.getElementById('uploadForm');
const reader = new FileReader();
// add functionality
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // append to the AVL TREE
    const estudiantesAVL = new AVLTree();
    // get the file from the file input
    const file = document.getElementById('file').files[0];
    // parse the file to JSON
    reader.readAsText(file);
    // console log
    reader.onload = () => {
        // parse to json
        const jsonFile = JSON.parse(reader.result);
        // insert the valors
        jsonFile["alumnos"].forEach((estudiante) => {
                // create the estudiante
                const nuevo_estudiante = new usuario_estudiante(estudiante.nombre, estudiante.carnet, estudiante.password, estudiante.raiz_archivo);
                // insert the valor
                estudiantesAVL.insertvalor(nuevo_estudiante.carnet, nuevo_estudiante);
            })
            // save the tree in the local storage
        localStorage.setItem('estudianteTreeAVL', JSON.stringify(estudiantesAVL.raiz));
    };
    console.log(typeof estudiantesAVL.raiz)
        // show alert 
    alert('Archivo cargado correctamente');
    // reset 
    form.reset();

});