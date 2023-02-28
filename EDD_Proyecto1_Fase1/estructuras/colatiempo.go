package estructuras

import (
	"fmt"
	"strconv"
)

type Cola_ struct {
	Primero_ *nodotiempo
	Longitud int
}

func (c_ *Cola_) estaVaciat() bool {
	if c_.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (c_ *Cola_) Encolart(hora string) {
	if c_.estaVaciat() {
		nuevoNodo_ := &nodotiempo{hora, nil}
		c_.Primero_ = nuevoNodo_
		c_.Longitud++
	} else {
		nuevoNodo_ := &nodotiempo{hora, nil}
		aux := c_.Primero_
		for aux.siguiente_ != nil {
			aux = aux.siguiente_
		}
		aux.siguiente_ = nuevoNodo_
		c_.Longitud++
	}
}

func (c_ *Cola_) Descolart() {
	if c_.estaVaciat() {
		fmt.Println("La cola no contiene elementos")
	} else {
		c_.Primero_ = c_.Primero_.siguiente_
		c_.Longitud--
	}
}

func (c_ *Cola_) MostrarPrimerot() {
	fmt.Println(c_.Primero_.hora)
}

func (c_ *Cola_) Graficar() {
	nombre_archivo := "./cola.dot"
	nombre_imagen := "cola.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record, style=filled, color=pink, fontname=\"Century Gothic\"];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := c_.Primero_
	contador := 0
	for i := 0; i < c_.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + aux.hora + "|}\"];\n"
		aux = aux.siguiente_
	}
	for i := 0; i < c_.Longitud-1; i++ {
		c_ := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c_) + ";\n"
		contador = c_
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
