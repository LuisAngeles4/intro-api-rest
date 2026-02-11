const API_URL = "https://698c005d21a248a2736032c5.mockapi.io/api/v1/dispositivos_IoT";

document.addEventListener("DOMContentLoaded", cargarDispositivos);

// READ
function cargarDispositivos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tablaDispositivos");
      tabla.innerHTML = "";

      data.forEach(d => {
        tabla.innerHTML += `
          <tr>
            <td>${d.id}</td>
            <td>${d.nombre}</td>
            <td>${d.ubicacion}</td>
            <td>${d.estado}</td>
            <td>
              <button class="editar" onclick='editarDispositivo(${JSON.stringify(d)})'>Editar</button>
              <button class="eliminar" onclick="eliminarDispositivo(${d.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

// CREATE & UPDATE
function guardarDispositivo() {
  const id = document.getElementById("deviceId").value;

  const dispositivo = {
    nombre: document.getElementById("nombre").value,
    ubicacion: document.getElementById("ubicacion").value,
    estado: document.getElementById("estado").value
  };

  if (id) {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dispositivo)
    }).then(() => {
      limpiarFormulario();
      cargarDispositivos();
    });
  } else {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dispositivo)
    }).then(() => {
      limpiarFormulario();
      cargarDispositivos();
    });
  }
}

// DELETE
function eliminarDispositivo(id) {
  if (confirm("¿Eliminar dispositivo?")) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    }).then(cargarDispositivos);
  }
}

// EDIT
function editarDispositivo(d) {
  document.getElementById("deviceId").value = d.id;
  document.getElementById("nombre").value = d.nombre;
  document.getElementById("ubicacion").value = d.ubicacion;
  document.getElementById("estado").value = d.estado;
}

function limpiarFormulario() {
  document.getElementById("deviceId").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("ubicacion").value = "";
  document.getElementById("estado").value = "";
}
