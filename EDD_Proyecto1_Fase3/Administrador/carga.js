// importa el arbol
import { AVLTree, userStudent } from "../JavaScript/AVL.js";

// obtiene el form
const form = document.getElementById("Carga");
const reader = new FileReader();
// añade funcionalidad
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const studentsAVL = new AVLTree();
    const file = document.getElementById("Archivo").files[0];
    reader.readAsText(file);
    reader.onload = () => {
        // parsea a Json
        const jsonFile = JSON.parse(reader.result);
        // inserta los valores 
        jsonFile["alumnos"].forEach((student) => {
                // crea al estudiante
                const newStudent = new userStudent(student.nombre, student.carnet, student.password, student.root_file);
                // inserta el estudiante
                studentsAVL.insertarValor(newStudent.carnet, newStudent);
            })
            // guarda al estudiante en el local storage
        localStorage.setItem("studentTreeAVL", JSON.stringify(studentsAVL.root));
    };
    alert("Se cargó correctamente el archivo"); 
    form.reset();

});