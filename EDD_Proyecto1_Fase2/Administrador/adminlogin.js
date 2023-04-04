// Obtiene el form de Inicio de Sesión
const form = document.getElementById('loginForm');

// Añade un EventListener par obtener los datos
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;

  const user = {
    username,
    password,
  };

  // compara usuario y contraseña 
  if (user.username === 'admin' && user.password === 'admin') {
    // redirect to another html file
    alert("Inicio de sesión exitoso.");
    window.location.href = 'Administrador/Carga.html';
  }else {
    // evaluate if is a student user
    const estudiante = ArbolEstudiantes.BusquedaEstudiante(user.nombre);
    // if the student exists
    if (estudiante) {
      // compare the password
      if (estudiante.contraseña === estudiante.password) {
        console.log("Bienvenido"  + estudiante.nombre);
      }
    }

    // Mostrar Alerta
    alert('Usuario o contraseña incorrectos');
    // Limpia el Form
    form.reset();

  }
});