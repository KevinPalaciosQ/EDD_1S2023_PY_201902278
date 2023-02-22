package estructuras

import (
	"fmt"
)

type Cola struct {
	Primero  *Nodo_pilas
	Longitud int
}

func (c *Cola) estaVacia() bool {
	if c.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(nombre string, apellido string, carnet int, password string) {
	if c.estaVacia() {
		nuevoNodo := &Nodo_pilas{nodo_estudiante: nil}
		c.Primero = nuevoNodo
		c.Longitud++
		fmt.Print("hola")
	} else {
		nuevoNodo := &Nodo_pilas{nodo_estudiante: nil}
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		c.Longitud++
		fmt.Print("adios")

	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		c.Primero.siguiente = c.Primero
		c.Longitud--
	}

}

func (c *Cola) MostrarPrimero() {
	fmt.Print(c.Primero.siguiente.nodo_estudiante.nombre)
	//fmt.Println(c.Primero.nodo_estudiante.apellido)
	//fmt.Println(c.Primero.nodo_estudiante.carnet)
	//fmt.Println(c.Primero.nodo_estudiante.password)
}
