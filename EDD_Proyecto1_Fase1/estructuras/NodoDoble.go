package estructuras

type NodoDoble struct {
	nestudiante *Nodo_estudiante
	anterior    *NodoDoble
	siguiente   *NodoDoble
	abajo       *nodotiempo //agregado
}
