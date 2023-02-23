package estructuras

type Operaciones interface {
	estaVacia() bool
	AgregarEstudiante(nombre string, apellido string, carnet int, password string)
	newNodo(nestudiante *Nodo_estudiante) *NodoDoble
	MostrarLista()
}
