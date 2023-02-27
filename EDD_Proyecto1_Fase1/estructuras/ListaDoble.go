package estructuras

import (
	"fmt"
	"strconv"
)

// Estructura de una Lista Doblemente Enlazada
type ListaDoble struct {
	Inicio   *NodoDoble
	Final    *NodoDoble
	Longitud int
}

func (l *ListaDoble) estaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) newNodo(nestudiante *Nodo_estudiante) *NodoDoble {
	return &NodoDoble{
		nestudiante,
		nil,
		nil,
	}
}

// Funcion AgregarEmpleado que se puede exportar (es decir es publica)
// Esta funcion es para la Lista Doblemente Enlazada
func (l *ListaDoble) AgregarEstudiante(nombre string, apellido string, carnet int, password string) {
	nuevoEstudiante := &Nodo_estudiante{nombre, apellido, carnet, password}
	if l.estaVacia() {
		nuevoNodo := l.newNodo(nuevoEstudiante)
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := l.newNodo(nuevoEstudiante)
		if l.Final.anterior == nil { //corroboramos si hay un solo elemento
			nuevoNodo.anterior = l.Inicio
			l.Inicio.siguiente = nuevoNodo
			l.Final = nuevoNodo
		} else { //Si hay mas de 1 elemento
			l.Final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.Final
			l.Final = nuevoNodo
		}
		l.Longitud++
	}
}

// Funciones para mostrar  el contenido de ambas listas
func (l *ListaDoble) MostrarLista() {
	aux := l.Inicio
	for aux != nil {
		fmt.Printf("Nombre: %s, Carnet:%d \n", aux.nestudiante.Nombre+aux.nestudiante.Apellido, aux.nestudiante.Carnet)
		aux = aux.siguiente
	}
}

// Funcion para el ordenamiento de la lista
func (l *ListaDoble) OrdenarEstudiantes(listado [10]int) {
	lista := listado

	for i := 0; i < len(lista); i++ {
		for j := 0; j < len(lista)-1; j++ {
			if lista[j] > lista[j+1] {
				temp := lista[j]
				lista[j] = lista[j+1]
				lista[j+1] = temp
			}
		}
	}
	fmt.Println("Lista de numeros ordenados: ", lista)
}
func (l *ListaDoble) OrdenamientoInsercion() {
	if l.Longitud > 1 {
		i := l.Inicio.siguiente
		for i != nil {
			j := i
			for j.anterior != nil && j.nestudiante.Carnet < j.anterior.nestudiante.Carnet {
				j.nestudiante, j.anterior.nestudiante = j.anterior.nestudiante, j.nestudiante
				j = j.anterior
			}
			i = i.siguiente
		}
	}
}
func ArchivoJSON(l *ListaDoble) string {
	contenido := "{\n"
	contenido += "\t\"alumnos\": [\n"
	aux := l.Inicio
	for aux.siguiente != nil {
		contenido += "\t\t{\n"
		contenido += "\t\t\t\"nombre\": \"" + (aux.nestudiante.Nombre) + "\", \n"
		contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.nestudiante.Carnet) + ", \n"
		contenido += "\t\t\t\"password\": \"" + (aux.nestudiante.Password) + "\", \n"
		contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
		contenido += "\t\t},\n"
		aux = aux.siguiente
	}
	//esto es para el ultimo elemento
	contenido += "\t\t{\n"
	contenido += "\t\t\t\"nombre\": \"" + (aux.nestudiante.Nombre) + "\", \n"
	contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.nestudiante.Carnet) + ", \n"
	contenido += "\t\t\t\"password\": \"" + (aux.nestudiante.Password) + "\", \n"
	contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
	contenido += "\t\t}\n"
	contenido += "\t]\n"
	contenido += "}"
	return contenido
}
func Generarjson(l *ListaDoble) {
	CrearArchivo()
	EscribirArchivo(ArchivoJSON(l))
}
