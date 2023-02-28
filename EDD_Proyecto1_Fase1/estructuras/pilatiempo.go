package estructuras

import (
	"fmt"
)

type Pila struct {
	Primero_ *nodotiempo
	Longitud int
}

func (p *Pila) estaVaciap() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string) {
	if p.estaVaciap() {
		nuevoNodo := &nodotiempo{hora, nil}
		p.Primero_ = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &nodotiempo{hora, p.Primero_}
		p.Primero_ = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVaciap() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero_ = p.Primero_.siguiente_
		p.Longitud--
	}
}

func (p *Pila) Peek() {
	if p.estaVaciap() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero_.hora)
	}
}

func (p *Pila) Graficar() {
	nombre_archivo := "./pila.dot"
	nombre_imagen := "pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record, color=purple, fontname=\"Century Gothic\"]"
	aux := p.Primero_
	texto += "nodo0 [label=\""
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|(" + aux.hora + ")"
		aux = aux.siguiente_
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
