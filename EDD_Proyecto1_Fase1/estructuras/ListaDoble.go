package estructuras

import (
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
		nil,
	}
}

func (l *ListaDoble) AgregarEstudiante(nombre string, apellido string, carnet int, password string) {
	nuevoEstudiante := &Nodo_estudiante{nombre, apellido, carnet, password}
	if l.estaVacia() {
		nuevoNodo := l.newNodo(nuevoEstudiante)
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := l.newNodo(nuevoEstudiante)
		if l.Final.anterior == nil {
			nuevoNodo.anterior = l.Inicio
			l.Inicio.siguiente = nuevoNodo
			l.Final = nuevoNodo
		} else {
			l.Final.siguiente = nuevoNodo
			nuevoNodo.anterior = l.Final
			l.Final = nuevoNodo
		}
		l.Longitud++
	}
}

func (l *ListaDoble) MostrarLista() {
	aux := l.Inicio
	for aux != nil {
		fmt.Printf("Nombre: %s, Carnet:%d \n", aux.nestudiante.Nombre+aux.nestudiante.Apellido, aux.nestudiante.Carnet)
		aux = aux.siguiente
	}
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

func (l *ListaDoble) GraficarDobles() {
	nombre_archivo := "./ListaDoble.dot"
	nombre_imagen := "ListaDoble.jpg"
	texto := "digraph listadoble{\n"
	texto += "node[shape = box, style=filled, color=skyblue, fontname=\"Century Gothic\"];\n"
	texto += "nodonull1[label=\"null\"];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := l.Inicio
	contador := 0
	texto2 := "{rank=same; nodonull1; nodonull2;"
	for i := 0; i < l.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"" + aux.nestudiante.Nombre + " " + aux.nestudiante.Apellido + "\\n" + strconv.Itoa(aux.nestudiante.Carnet) + "\"group=" + strconv.Itoa(i) + "];\n"
		if aux.abajo != nil {
			aux2 := aux.abajo
			contador := 0
			for aux2 != nil {
				texto += "nodo" + strconv.Itoa(i) + "_" + strconv.Itoa(contador) + "[label=\"Se inició sesión\\n" + aux2.hora + "\" group=" + strconv.Itoa(i) + "];\n"
				aux2 = aux2.siguiente_
				contador++
			}
			aux2 = aux.abajo
			contador = 0
			texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(i) + "_" + strconv.Itoa(contador) + ";\n"
			for aux2 != nil {
				if aux2.siguiente_ != nil {
					c := contador + 1
					texto += "nodo" + strconv.Itoa(i) + "" + strconv.Itoa(contador) + "->nodo" + strconv.Itoa(i) + "" + strconv.Itoa(c) + ";\n"
				}
				aux2 = aux2.siguiente_
				contador++
			}
		}
		texto2 += "nodo" + strconv.Itoa(i) + "; "
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
	texto2 += "}"
	texto += texto2
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
func (l *ListaDoble) Recorrer(Carnet string, Contraseña string) *Nodo_estudiante {
	if l.estaVacia() {
		return nil
	} else {
		aux := l.Final
		for i := 0; i < l.Longitud; i++ {
			if Carnet == strconv.Itoa(aux.nestudiante.Carnet) && Contraseña == aux.nestudiante.Password {
				return aux.nestudiante
			}
			aux = aux.anterior
		}
		return nil
	}
}

func (l *ListaDoble) nc(hora string) *nodotiempo {
	return &nodotiempo{
		hora,
		nil,
	}

}
func (l *ListaDoble) AgregarBitacora(Carnet string, hora string) {
	if !l.estaVacia() {
		aux := l.Inicio
		for aux != nil {
			if Carnet == strconv.Itoa(aux.nestudiante.Carnet) {
				break
			}
			aux = aux.siguiente
		}
		if aux != nil {
			nuevoNodob := l.nc(hora)
			nuevoNodob.siguiente_ = aux.abajo
			aux.abajo = nuevoNodob
		}
	}
}
