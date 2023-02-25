package estructuras

import (
	"fmt"
)

type Pila struct {
	First    *nodotiempo
	Longitud int
}

func (p *Pila) estaVaciat() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string) {
	if p.estaVaciat() {
		nuevoNodo := &nodotiempo{hora, nil}
		p.First = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &nodotiempo{hora, p.First}
		p.First = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVaciat() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.First = p.First.next
		p.Longitud--
	}
}

func (p *Pila) Peek() {
	if p.estaVaciat() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.First.hora)
	}
}

func (p *Pila) Graficar() {
	nombre_archivo := "./pila.dot"
	nombre_imagen := "pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.First
	texto += "nodo0 [label=\""
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|(" + aux.hora + ")"
		aux = aux.next
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
