package estructuras

import (
	"fmt"
)

type Pilaestudiantes struct {
	Primero_ *nodotiempo
	Longitud int
}

func (p *Pilaestudiantes) estaVaciap() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pilaestudiantes) Push(hora string) {
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

func (p *Pilaestudiantes) Pop() {
	if p.estaVaciap() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero_ = p.Primero_.siguiente_
		p.Longitud--
	}
}

func (p *Pilaestudiantes) Peek() {
	if p.estaVaciap() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero_.hora)
	}
}
