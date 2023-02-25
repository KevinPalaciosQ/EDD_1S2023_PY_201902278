package estructuras

import (
	"fmt"
	"strconv"
)

type Kola struct {
	First    *nodotiempo
	Longitud int
}

func (k *Kola) estaVaciat() bool {
	if k.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (k *Kola) Encolart(hora string) {
	if k.estaVaciat() {
		nuevoNodo := &nodotiempo{hora, nil}
		k.First = nuevoNodo
		k.Longitud++
	} else {
		nuevoNodo := &nodotiempo{hora, nil}
		aux := k.First
		for aux.next != nil {
			aux = aux.next
		}
		aux.next = nuevoNodo
		k.Longitud++
	}
}

func (k *Kola) Descolart() {
	if k.estaVaciat() {
		fmt.Println("La cola no contiene elementos")
	} else {
		k.First = k.First.next
		k.Longitud--
	}
}

func (k *Kola) MostrarPrimerot() {
	fmt.Println(k.First.hora)
}

func (k *Kola) Graficar() {
	nombre_archivo := "./cola.dot"
	nombre_imagen := "cola.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := k.First
	contador := 0
	for i := 0; i < k.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + aux.hora + "|}\"];\n"
		aux = aux.next
	}
	for i := 0; i < k.Longitud-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
