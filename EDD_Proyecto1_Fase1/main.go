package main

import (
	"EDD_Proyecto1_Fase1/estructuras"
	"fmt"
)

var cola = &estructuras.Cola{Primero: nil, Longitud: 0}
var lista = &estructuras.ListaDoble{Inicio: nil, Final: nil}

func main() {

	//Variables a utilizar en el menú
	var (
		usuario     string
		contrasenia string
	)

	option := 0
	exit := false
	for !exit {
		fmt.Println("*****************EDD GoDrive*****************")
		fmt.Println("*		1. Iniciar Sesión           *")
		fmt.Println("*		2. Salir del Sistema        *")
		fmt.Println("*********************************************")
		fmt.Print("Elige una Opción: ")
		fmt.Scan(&option)
		switch option {
		case 1:
			fmt.Print("Ingresa tu Usuario : ")
			fmt.Scan(&usuario)
			fmt.Print("Ingresa tu Contraseña : ")
			fmt.Scan(&contrasenia)
			fmt.Print("")
			if usuario == "admin" && contrasenia == "admin" {
				fmt.Println("Se inició Correctamente")
				//Println("entró con éxito")
				main2()

			} else {
				fmt.Println("Error en Credenciales")
			}
			break
		case 2:

			fmt.Println("Saliendo del Sistema... ")
			exit = true
			break
		}
	}
}
func main2() {
	//Variables a utilizar en el menú
	option := 0

	exit1 := false
	for !exit1 {
		fmt.Println("************* Dashboard Administrador - EDD GoDrive*************")
		fmt.Println("*		 1. Ver Estudiantes Pendientes                 *")
		fmt.Println("*		 2. Ver Estudiantes del Sistema                *")
		fmt.Println("*		 3. Registrar Nuevo Estudiante                 *")
		fmt.Println("*		 4. Carga Masiva de Estudiantes                *")
		fmt.Println("*		 5. Listado de Estudiantes                     *")
		fmt.Println("*		 6. Cerrar Sesión                              *")
		fmt.Println("****************************************************************")
		fmt.Print("Elige una Opción: ")
		fmt.Scan(&option)
		switch option {
		case 1:
			fmt.Println("Has Elegido la opción 1")
			EstudiantesPendientes()
			break
		case 2:
			fmt.Println("Has Elegido la opción 2")
			MostrarPrimerEstudiante()
			break
		case 3:
			RegistroEstudiante()
		case 4:
			fmt.Println("Has Elegido la opción 4")
			CargaMasiva()
			break
		case 5:
			fmt.Println("Has Elegido la opción 5")
			lista.MostrarLista()
			break
		case 6:
			fmt.Println("Cerrando Sesión...")
			exit1 = true
			break
		}
	}
}
func RegistroEstudiante() {
	//Variables a utilizar en el menú
	var (
		nombre   string
		apellido string
		carnet   int
		password string
	)
	option := 0
	//cola := &estructuras.Cola{Primero: nil, Longitud: 0}
	exit := false
	for !exit {
		fmt.Println("************* Registro de Estudiantes - EDD GoDrive*************")
		fmt.Println("1. Registrar un Estudiante")
		fmt.Println("2. Regresar")
		fmt.Scan(&option)
		fmt.Println("Elige una Opción: ")
		switch option {
		case 1:
			fmt.Println("Has Elegido la opción 1")
			fmt.Print("Ingresa tu Nombre : ")
			fmt.Scan(&nombre)
			fmt.Print("Ingresa tu Apellido : ")
			fmt.Scan(&apellido)
			fmt.Print("Ingresa tu Carnet : ")
			fmt.Scan(&carnet)
			fmt.Print("Ingresa tu Contraseña : ")
			fmt.Scan(&password)
			cola.Encolar(nombre, apellido, carnet, password)

			break
		case 2:
			fmt.Println("Cerrando Menú...")
			exit = true
			break
		}
	}
}

func MostrarPrimerEstudiante() {
	//Variables a utilizar en el menú
	option := 0
	cola := &estructuras.Cola{Primero: nil, Longitud: 0}
	exit := false
	for !exit {
		fmt.Println("************* Listado de Estudiantes*************")
		fmt.Println("1. Mostrar un Estudiante")
		fmt.Println("2. Regresar")
		fmt.Scan(&option)
		fmt.Print("Elige una Opción: ")
		switch option {
		case 1:
			fmt.Println("Has Elegido la opción 1")
			cola.MostrarPrimero()
			break
		case 2:
			fmt.Println("Cerrando Menú...")
			exit = true
			break
		}
	}
}

func EstudiantesPendientes() {
	//Variables a utilizar en el menú
	option := 0
	exit := false
	for !exit {
		if cola.Longitud != 0 {
			//Acá van los Estudiantes Pendientes
			cola.MostrarPrimero()
			fmt.Println("*       1. Aceptar al Estudiante")
			fmt.Println("*       2. Rechazar al Estudiante")
			fmt.Println("*       3. Volver al Menu")
			fmt.Scan(&option)
			fmt.Print("Elige una Opción: ")
			switch option {
			case 1:
				fmt.Println("Estudiante Aceptado")
				//Desencola y manda a lista doble
				lista.AgregarEstudiante(cola.CambioCola().Nombre, cola.CambioCola().Apellido, cola.CambioCola().Carnet, cola.CambioCola().Password)
				cola.Descolar()
				//aca deberian ir los pendientes
				break
			case 2:
				fmt.Println("Estudiante Rechazado")
				//Aca deberían ir los estudiantes Rechazados
				break
			case 3:
				fmt.Println("Cerrando Menú...")
				exit = true
				break
			}
		} else {
			fmt.Println("la cola esta vacia")
			exit = true
		}
	}

}
func CargaMasiva() {
	//Variables a utilizar en el menú
	option := 0
	exit := false
	for !exit {
		fmt.Println("************* Carga Masiva *************")
		fmt.Println(" Estudiante Actual: ")
		fmt.Println("1. Carga Masiva")
		fmt.Println("2. Volver al Menu")
		fmt.Scan(&option)
		fmt.Print("Elige una Opción: ")
		switch option {
		case 1:
			fmt.Println("Estudiante Aceptado")
			break
		case 2:
			fmt.Println("Cerrando Menú...")
			exit = true
			break
		}
	}
}
