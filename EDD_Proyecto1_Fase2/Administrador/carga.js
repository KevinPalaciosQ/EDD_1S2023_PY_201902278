// Importaciones realizadas 
import { AVLTree, userStudent } from "../JavaScript/AVL.js";
const form = document.getElementById("Carga");
const reader = new FileReader();
// se da uso al Event Listener 
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentsAVL = new AVLTree();

    const file = document.getElementById("Archivo").files[0];

    reader.readAsText(file);

    reader.onload = () => {

        const jsonFile = JSON.parse(reader.result);

        jsonFile["alumnos"].forEach((student) => {
                // Creación del estudiante
                const newStudent = new userStudent(student.nombre, student.carnet, student.password, student.root_file);
                // Se inserta el estudiante
                studentsAVL.insertarValor(newStudent.carnet, newStudent);
            })
            // Se obtiene el LocalStorage
        localStorage.setItem('studentTreeAVL', JSON.stringify(studentsAVL.raiz));
    };

    alert('Archivo cargado correctamente');

    form.reset();

});