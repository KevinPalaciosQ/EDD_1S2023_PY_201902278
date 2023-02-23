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

func (c *Cola) Encolar(Nombre string, Apellido string, Carnet int, Password string) {

	nodo_estudiante := &Nodo_estudiante{Nombre, Apellido, Carnet, Password}
	if c.estaVacia() {
		nuevoNodo := &Nodo_pilas{nodo_estudiante, nil}
		c.Primero = nuevoNodo
		c.Longitud++
		//fmt.Print("hola")
	} else {
		nuevoNodo := &Nodo_pilas{nodo_estudiante, nil}
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		c.Longitud++
	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		c.Primero = c.Primero.siguiente
		c.Longitud--
		fmt.Println("se descolo")
	}

}

func (c *Cola) MostrarPrimero() {
	fmt.Println("*********************** Pendientes: ", c.Longitud, " ***********************")
	fmt.Println("* Estudiante Actual: ", c.Primero.nodo_estudiante.Nombre)
	fmt.Println("****************************************************************************")

}
func (c *Cola) CambioCola() *Nodo_estudiante {
	if c.estaVacia() {
		return nil

	} else {
		return c.Primero.nodo_estudiante
	}
}
