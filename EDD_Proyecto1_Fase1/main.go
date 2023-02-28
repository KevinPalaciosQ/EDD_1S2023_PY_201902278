package main

import (
	"EDD_Proyecto1_Fase1/estructuras"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"time"
)

var cola *estructuras.Cola = &estructuras.Cola{Primero: nil, Longitud: 0}
var lista *estructuras.ListaDoble = &estructuras.ListaDoble{Inicio: nil, Final: nil}
var cola_ *estructuras.Cola_ = &estructuras.Cola_{Primero_: nil, Longitud: 0}
var pila *estructuras.Pila = &estructuras.Pila{Primero_: nil, Longitud: 0}

// -------------------------------MENU PRINCIPAL DEL PROGRAMA---------------------------------------------------------------------------
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
				fmt.Println("Bienvenido Administrador")
				//Println("entró con éxito")
				main2()
				//pila.Push(formato_hora())
				//pila.Graficar()
			} else if usuario == "admin" && contrasenia != "admin" {
				fmt.Println("Contraseña Incorrecta")

			} else if usuario != "admin" {
				fmt.Println("Serás dirigido al Dashbord de Estudiantes")
				LoginEstudiante()
			}
			break
		case 2:

			fmt.Println("Saliendo del Sistema... ")
			exit = true
			break
		}
	}
}

// --------------------------------------------------LOGIN DE ADMINISTRADOR--------------------------------------------------------------
func main2() {
	//Variables a utilizar en el menú
	option := 0

	exit1 := false
	for !exit1 {
		fmt.Println("************* Dashboard Administrador - EDD GoDrive*************")
		fmt.Println("*		 1. Ver Estudiantes Pendientes                 *")
		fmt.Println("*		 2. Ver Estudiantes del Sistema Ordenado       *")
		fmt.Println("*		 3. Registrar Nuevo Estudiante                 *")
		fmt.Println("*		 4. Carga Masiva de Estudiantes                *")
		fmt.Println("*		 5. Listado de Estudiantes Desordendo          *")
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
			cola_.Graficar()
			break
		case 6:
			fmt.Println("Cerrando Sesión...")
			exit1 = true
			break
		}
	}
}

// -----------------------------------MENU PARA REGISTRAR ESTUDIANTES A MANITA-----------------------------------------------------------
func RegistroEstudiante() {
	//Variables a utilizar en el menú
	var (
		nombre   string
		apellido string
		carnet   int
		password string
	)
	option := 0
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

// -------------------------------------------------MENU QUE MUESTRA ESTUDIANTES ORDENADOS-----------------------------------------------
func MostrarPrimerEstudiante() {
	//Variables a utilizar en el menú
	option := 0
	//cola := &estructuras.Cola{Primero: nil, Longitud: 0}
	exit := false
	for !exit {
		fmt.Println("************* Listado de Estudiantes*************")
		fmt.Println("1. Mostrar Estudiantes")
		fmt.Println("2. Regresar")
		fmt.Scan(&option)
		fmt.Print("Elige una Opción: ")
		switch option {
		case 1:
			fmt.Println("Has Elegido la opción 1")
			fmt.Println("Estudiantes Ordenados ")
			lista.OrdenamientoInsercion()
			lista.MostrarLista()
			lista.GraficarListaDoblee()
			//lista.GraficarListaDoble()
			//ACA DEBEN DE IR ESTUDIANTES ORDENADOS----------------------------------------------------------------------
			//cola.MostrarPrimero()-------------aca no va nada
			//pila.Graficar()
			break
		case 2:
			fmt.Println("Cerrando Menú...")
			exit = true
			break
		}
	}
}

// ----------------------------------------------------------ESTUDIANTES PENDIENTES A INGRESAR AL SISTEMA-----------------------------------------
func EstudiantesPendientes() {
	//Variables a utilizar en el menú
	option := 0
	exit := false
	//contenido := estructuras.ArchivoJSON(lista)
	for !exit {
		if cola.Longitud != 0 {
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
				pila.Push("Se Aceptó a Estudiante: " + formato_hora())

				pila.Graficar()
				estructuras.Generarjson(lista)
				//estructuras.CrearArchivo()
				//estructuras.EscribirArchivo(contenido)

				cola.GraficarEstudiantes()
				break
			case 2:
				fmt.Println("Estudiante Rechazado")
				//Descola-Elimina estudiantes y genera reporte
				cola.Descolar()
				pila.Push("Se Rechazó a Estudiante " + formato_hora())

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

// -----------------------------------------------MENU PARA LA CARGA MASIVA----------------------------------------------------------------
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
			fmt.Println("Se hizo la carga masiva correctamente")
			CargaMasivadeArchivos()
			break
		case 2:
			fmt.Println("Cerrando Menú...")
			exit = true
			break
		}
	}
}

// -------------------------------------METODO PARA OBTENER LA FECHA Y HORA---------------------------------------------------------------------
func formato_hora() string {
	tiempo := time.Now()
	texto_final := fmt.Sprintf("%d/%02d/%02d %02d:%02d:%02d",

		tiempo.Day(), tiempo.Month(), tiempo.Year(),
		tiempo.Hour(), tiempo.Minute(), tiempo.Second())

	return texto_final

}

// ------------------------------------------CARGA DE ESTUDIANTES------------------------------------------------------------------------
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

// ------------------------------------------------MENU LOGIN DE ESTUDIANTES-----------------------------------------------------------------
func LoginEstudiante() {
	option := 0
	exit1 := false
	for !exit1 {
		fmt.Println("************* Dashboard Estudiantes - EDD GoDrive*************")
		fmt.Println("*		 1. Iniciar Sesión                               *")
		fmt.Println("*		 2. Cerrar Menú                                  *")
		fmt.Scan(&option)
		fmt.Print("Elige una Opción: ")
		switch option {
		case 1:

			break
		case 2:
			fmt.Println("Cerrando Menú...")
			exit1 = true
			break
		}
	}
}
