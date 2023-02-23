package estructuras

import (
	"fmt"
)

type Pila struct {
	Primero  *nodotiempo
	Longitud int
}

func (p *Pila) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string) {
	if p.estaVacia() {
		nuevoNodo := &nodotiempo{hora, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &nodotiempo{hora, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Longitud--
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.hora)
	}
}

func (p *Pila) Graficar() {
	nombre_archivo := "./pila.dot"
	nombre_imagen := "pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.Primero
	texto += "nodo0 [label=\""
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|(" + aux.hora + ")"
		aux = aux.siguiente
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
