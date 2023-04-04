function logear(){
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
    location.href = './EDD_Proyecto1_Fase2/Administrador/Carga.html';
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

  }
}
