package estructuras

import "fmt"

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

//Funcion para el ordenamiento de la lista
func (l *ListaDoble) OrdenarEstudiantes() {

}
