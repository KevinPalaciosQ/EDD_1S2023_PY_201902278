# MANUAL TÉCNICO 
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
1.1 Funciones de la Aplicación
### formato_hora()
```
func formato_hora() string {
	tiempo := time.Now()
	texto_final := fmt.Sprintf("%d/%02d/%02d %02d:%02d:%02d",

		tiempo.Day(), tiempo.Month(), tiempo.Year(),
		tiempo.Hour(), tiempo.Minute(), tiempo.Second())

	return texto_final

}
```
