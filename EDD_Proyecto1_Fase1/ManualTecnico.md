#  <center>MANUAL TÉCNICO </center> 
![golang pet](https://user-images.githubusercontent.com/95326781/221983369-30b90501-59af-4198-9af9-6fa180121b93.png)
---
## Proyecto 1 - Fase 1
## Primer Semestre 2023
## Facultad de Ingeniería, Escuela de Ciencias y Sistemas
## Universidad de San Carlos de Guatemala
---
1.	Introducción
La Aplicación realizada en el lenguje de programación Golang fue realizada con el fin de poder dar resolución al problema planteado en el curso de Estructura de Datos. Este programa hecho en Golang recibió apoyo de las Librería Graphiz, la Librería Time, y la Librería encoding/csv.
---
2.	Objetivo
El Objetivo primordial de este manual es orientar al programador acerca de la explicación de la forma en la que fue creada la aplicación desde el código fuente, la ubicación de la aplicación de las estructuras de datos y la importante utilización de la Programación Orientada a Objetos en Golang para poder crear distintos TDA para la resolución de sus requerimientos del sistema.
---
3.	Dirigido 
El manual va dirigido a distintos programadores interesados en el conocimiento de las estructuras de datos y su implementación en Golang.
---
4. Especificación Técnica
4.1 Requisitos de Hardware
- Computadora de Escritorio o Portatil 
- Minimo 4GB de RAM
- Procesador Intel Core i3 o Superior
- Resolución Gráfica Máxima de 1900 x 1070 Píxeles
4.2 Requisitos de Software
- Computadora con Visual Basic Instalado para el uso de la Aplicación
- Tener Instalada la Librería Graphiz
---
5. Lógica de la Aplicación
5.1 Funciones de la Aplicación
###   formato_hora()
Funcion encargada de obtener la hora y fecha del sistema al Apilar Estudiantes
```
func formato_hora() string {
	tiempo := time.Now()
	texto_final := fmt.Sprintf("%d/%02d/%02d %02d:%02d:%02d",

		tiempo.Day(), tiempo.Month(), tiempo.Year(),
		tiempo.Hour(), tiempo.Minute(), tiempo.Second())

	return texto_final

}
```
###   CargaMasivadeArchivos()
Funcion encargada de Cargar los archivos del programa
```
func CargaMasivadeArchivos() {
	fmt.Println("***********************************CARGA MASIVA*********************")
	file, eror := os.Open("Estudiantes.csv")
	if eror != nil {
		panic(eror)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	reader.Comma = ','
	reader.FieldsPerRecord = -1

	headers, eror := reader.Read()
	if eror != nil {
		panic(eror)
	}
	fmt.Println("Se han cargado correctamente con formato:", headers)
	for {
		record, eror := reader.Read()
		if eror != nil {
			break
		}
		val_carnet, eror := strconv.Atoi(record[0])
		if eror != nil {
			print(eror)
		}
		cola.Encolar(record[1], "", val_carnet, record[2])
	}
}

```
###   ArchivoJSON()
Funcion encargada de Generar el Archivo Json
```
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
```
5.2 Estructuras de Datos
## Cola Estudiantes/Lista Simple
```
type Cola struct {
	Primero  *Nodo_pilas
	Longitud int
}

```
## Nodo_estudiante
```
type Nodo_estudiante struct {
	Nombre   string
	Apellido string
	Carnet   int
	Password string
}
```
## Nodo_Pilas
### Encargado de conectar estudiantes y pilas.
```
type Nodo_pilas struct {
	nodo_estudiante *Nodo_estudiante
	siguiente       *Nodo_pilas
}
```
## NodoDoble
### Encargado de conectar la Lista Doble con un nodo Doble.
```
type NodoDoble struct {
	nestudiante *Nodo_estudiante
	anterior    *NodoDoble
	siguiente   *NodoDoble
}
```
## NodoTiempo
### Encargado de guardar la fecha y hora de la pila tiempo.
```
type nodotiempo struct {
	hora       string
	siguiente_ *nodotiempo
}
```
## Pila tiempo
### Estructura de una pila.
```
type Pila struct {
	Primero_ *nodotiempo
	Longitud int
}
```
## ListaDoble
### Estructura de una Lista Doblemente Enlazada
```
type ListaDoble struct {
	Inicio   *NodoDoble
	Final    *NodoDoble
	Longitud int
}
```
