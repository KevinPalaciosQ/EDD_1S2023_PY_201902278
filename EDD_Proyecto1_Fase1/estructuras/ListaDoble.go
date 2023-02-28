package estructuras

import (
	"bytes"
	"fmt"
	"strconv"
)

// Estructura de una Lista Doblemente Enlazada
type ListaDoble struct {
	Inicio   *NodoDoble
	Final    *NodoDoble
	Longitud int
}

func (l *ListaDoble) estaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) newNodo(nestudiante *Nodo_estudiante) *NodoDoble {
	return &NodoDoble{
		nestudiante,
		nil,
		nil,
	}
}

// Funcion AgregarEmpleado que se puede exportar (es decir es publica)
// Esta funcion es para la Lista Doblemente Enlazada
func (l *ListaDoble) AgregarEstudiante(nombre string, apellido string, carnet int, password string) {
	nuevoEstudiante := &Nodo_estudiante{nombre, apellido, carnet, password}
	if l.estaVacia() {
		nuevoNodo := l.newNodo(nuevoEstudiante)
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := l.newNodo(nuevoEstudiante)
		if l.Final.anterior == nil { //corroboramos si hay un solo elemento
			nuevoNodo.anterior = l.Inicio
			l.Inicio.siguiente = nuevoNodo
			l.Final = nuevoNodo
		} else { //Si hay mas de 1 elemento
			l.Final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.Final
			l.Final = nuevoNodo
		}
		l.Longitud++
	}
}

// Funciones para mostrar  el contenido de ambas listas
func (l *ListaDoble) MostrarLista() {
	aux := l.Inicio
	for aux != nil {
		fmt.Printf("Nombre: %s, Carnet:%d \n", aux.nestudiante.Nombre+aux.nestudiante.Apellido, aux.nestudiante.Carnet)
		aux = aux.siguiente
	}
}

// Funcion para el ordenamiento de la lista
func (l *ListaDoble) OrdenarEstudiantes(listado [10]int) {
	lista := listado

	for i := 0; i < len(lista); i++ {
		for j := 0; j < len(lista)-1; j++ {
			if lista[j] > lista[j+1] {
				temp := lista[j]
				lista[j] = lista[j+1]
				lista[j+1] = temp
			}
		}
	}
	fmt.Println("Lista de numeros ordenados: ", lista)
}
func (l *ListaDoble) OrdenamientoInsercion() {
	if l.Longitud > 1 {
		i := l.Inicio.siguiente
		for i != nil {
			j := i
			for j.anterior != nil && j.nestudiante.Carnet < j.anterior.nestudiante.Carnet {
				j.nestudiante, j.anterior.nestudiante = j.anterior.nestudiante, j.nestudiante
				j = j.anterior
			}
			i = i.siguiente
		}
	}
}
func ArchivoJSON(l *ListaDoble) string {
	contenido := "{\n"
	contenido += "\t\"alumnos\": [\n"
	aux := l.Inicio
	for aux.siguiente != nil {
		contenido += "\t\t{\n"
		contenido += "\t\t\t\"nombre\": \"" + (aux.nestudiante.Nombre) + "\", \n"
		contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.nestudiante.Carnet) + ", \n"
		contenido += "\t\t\t\"password\": \"" + (aux.nestudiante.Password) + "\", \n"
		contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
		contenido += "\t\t},\n"
		aux = aux.siguiente
	}
	//esto es para el ultimo elemento
	contenido += "\t\t{\n"
	contenido += "\t\t\t\"nombre\": \"" + (aux.nestudiante.Nombre) + "\", \n"
	contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.nestudiante.Carnet) + ", \n"
	contenido += "\t\t\t\"password\": \"" + (aux.nestudiante.Password) + "\", \n"
	contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
	contenido += "\t\t}\n"
	contenido += "\t]\n"
	contenido += "}"
	return contenido
}
func Generarjson(l *ListaDoble) {
	CrearArchivo()
	EscribirArchivo(ArchivoJSON(l))
}
func (l *ListaDoble) GraficarListaDoble() {
	var a bytes.Buffer
	nombre_archivo := "./ListaDoble.dot"
	nombre_imagen := "ListaDoble.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := l.Inicio
	for aux != nil {
		a.WriteString(fmt.Sprintf("\"%p\"[label=\"{<prev>|%v|<next>}\"]\n", aux, aux.nestudiante.Nombre))
		if aux.siguiente != nil {
			a.WriteString(fmt.Sprintf("\"%p\":next  -> \"%p\":prev\n", aux, &aux.nestudiante.Nombre))
		}
		aux = aux.siguiente
	}
	texto += ("}\n")
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

/*
	func (l *ListaDoble)GraficaListaDoble(){
		temporal :=l.Inicio
		//codigodot :="digraph G{\ngraph[pad=0.5,nodesep=1,ranksep=1,shape=box,fillcolor=deeppink3];\nnode[shape=box, fillcolor=deeppink3,color=darkred]\nfontsize=28;\nede[dir=]"}
		nodos := ""
		conexiones:= ""
		numnodo:=0
		contador:=0
		nombre_archivo := "./ListaDoble.dot"
		nombre_imagen := "ListaDoble.jpg"
		direccion:= "\n{rank=same; "
		if l.Longitud<5{
			for contador !=l.Longitud{
				nodos += fmt.Sprintf("Nodo%d[label =\" %s\\n %s \"];\n",numnodo,strconv.Itoa(temporal.nestudiante.Carnet),temporal.nestudiante.Apellido)
				direccion += fmt.Sprintf("Nodo%d;",numnodo)
				temporal=temporal.siguiente
				contador++
				numnodo++
			}
			direccion+="}\n"
			contador=0
			numnodo=0
			for contador !=l.Longitud-1{
				numaux:= numnodo+1
				conexiones+= fmt.Sprintf("",numnodo,numaux)
				numnodo++
				numaux++

			}
		}
	}
*/
func (l *ListaDoble) GraficarListaDoblee() {
	nombre_archivo := "./ListaDoble.dot"
	nombre_imagen := "ListaDoble.jpg"
	texto := "digraph listadoble{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record, style=filled, color=skyblue, fontname=\"Century Gothic\"];\n"
	texto += "nodonull1[label=\"null\"];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := l.Inicio
	contador := 0
	for i := 0; i < l.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + aux.nestudiante.Nombre + "  " + aux.nestudiante.Apellido + "  " + strconv.Itoa(aux.nestudiante.Carnet) + "}\"];\n"
		aux = aux.siguiente
	}
	for i := 0; i < l.Longitud-1; i++ {
		l := i + 1
		if i == 0 {
			texto += "nodonull1->" + "nodo" + strconv.Itoa(i) + ";\n"
		}
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(l) + ";\n"
		texto += "nodo" + strconv.Itoa(l) + "->nodo" + strconv.Itoa(i) + ";\n"
		contador = l
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
