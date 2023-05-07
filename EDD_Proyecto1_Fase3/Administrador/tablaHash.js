
const hashTable = JSON.parse(localStorage.getItem("hashTable"));

// obtiene la tabla 
const tableBody = document.querySelector("#table-students tbody");
const tablePermissionsBody = document.querySelector("#table-permissions tbody");
//setea inorder 
const setInOrderTable = () => {
  //coloca la tabla 
  hashTable.table.forEach((node, index) => {
    if (node != null) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">${
          index + 1
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.carnet
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.user.name
        }</td>
        <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">${
          node.password
        }</td>
      `;
      tableBody.appendChild(row);
    }
  });
};

// da los permisos 
const setPermissions = () => {
  // obtiene la tabla 
  hashTable.table.forEach((node, index) => {
    if (node != null) {
      if (
        !(node.user.directories.root.matrix.permisos.length === 0) ||
        !(node.user.directories.root.matrix.convertedFiles.length === 0)
      ) {
        const directories = node.user.directories.root;
        // crea una lista para guardar matrz con permisos 
        let listMatrix = [];
        // evalua si la matriz esta vacia 
        if (directories.matrix.permisos.length !== 0) {
          listMatrix.push({
            matrix: directories.matrix,
            path: directories.value,
          });
        }
        // funcion recursiva para iterar el siguiente y primer nodo para encontrar si la matriz esta vacia o no 
        listMatrix = [...listMatrix, ...getMatrix(directories.first)];

        // itera la lista para crear una tabla 
        listMatrix.forEach((permissions, index) => {
          permissions.matrix.permisos.forEach((permission) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${node.user.carnet.toString()}</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.carnet
            }</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">"${
              permissions.path 
            }"</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.file_name 
            }</td>
            <td class="whitespace-nowrap py-4 px-3 text-sm text-black">${
              permission.permission 
            }</td>
            `;
            tablePermissionsBody.appendChild(row);
          });
        });
      }
    }
  });
};

let path = "";

const getMatrix = (node) => {
  let listMatrix = [];

  // si la matriz no esta vacía la añade al path 
  if (node) {
    if (
      node.matrix.permisos.length !== 0 &&
      node.matrix.convertedFiles.length !== 0
    ) {
      listMatrix.push({ matrix: node.matrix, path: path + node.value });
    }
    path = "";
    if (node.first) {
      path = path + "/" + node.value + "/";
      listMatrix = listMatrix.concat(getMatrix(node.first));
    }
    if (node.next) {
      path = path + "/" + node.value + "/";
      listMatrix = listMatrix.concat(getMatrix(node.next));
    }
  }
  path = "";
  return listMatrix;
};

setInOrderTable();
setPermissions();
