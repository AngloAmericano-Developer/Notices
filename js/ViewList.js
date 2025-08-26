let estudiantesSeleccionados = [];

function convertirNumeroALetra(numeroStr) {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = parseInt(numeroStr, 10);
  return letras[num - 1] || numeroStr; // fallback por si es > Z
}

function viewListComplete() {
  $("#content").load("views/viewList.html", function () {
    // Obtener grados solamente al inicio
    var getgrado = getGrado();

    $.when(getgrado)
      .done(function (grade) {
        const idGrade = grade["response"];
        const gradosUnicos = new Set();
        const cursosPorGrado = {};

        idGrade.forEach((item) => {
          const grado = item.descripcion;
          const curso = item.curso;

          gradosUnicos.add(grado);

          if (!cursosPorGrado[grado]) {
            cursosPorGrado[grado] = new Set();
          }
          cursosPorGrado[grado].add(curso);
        });

        // Poblar selector de grado
        const $gradoSelect = $("#formGroupGrade");
        $gradoSelect.empty().append(`<option selected value="--">--</option>`);
        Array.from(gradosUnicos)
          .sort()
          .forEach((grado) => {
            $gradoSelect.append(`<option value="${grado}">${grado}</option>`);
          });

        // Al cambiar grado
        $gradoSelect.on("change", function () {
          const gradoSeleccionado = $(this).val();
          const $cursoSelect = $("#formGroupCurse");
          $cursoSelect
            .empty()
            .append(`<option selected value="--">--</option>`);

          if (cursosPorGrado[gradoSeleccionado]) {
            const cursosOrdenados = Array.from(
              cursosPorGrado[gradoSeleccionado]
            ).sort((a, b) => parseInt(a) - parseInt(b));
            cursosOrdenados.forEach((curso) => {
              const letra = convertirNumeroALetra(curso);
              $cursoSelect.append(`<option value="${curso}">${letra}</option>`);
            });
          }
        });

        $("#btnsend").on("click", function () {
          const descripcionGrado = $("#formGroupGrade").val();
          const curso = $("#formGroupCurse").val();

          const idgrado = idGrade.find(
            (g) => g.descripcion === descripcionGrado
          )?.id_grado;
          console.log(idgrado, curso);
          if (idgrado && curso) {
            const getList = GetList(idgrado, curso);
            $.when(getList).done(function (data) {
              const responseData = data["response"];
              renderTabla(responseData);
              console.log("Tabla renderizada con datos:", responseData);
            });
          } else {
            alert("Por favor selecciona un grado y un curso válido.");
          }
        });
      })
      .fail(function (event) {
        console.log("Error al obtener grados:", event);
      });
  });
}





  function agruparPorGrado(estudiantes) {
    const grupos = {};

    estudiantes.forEach(est => {
      // Aquí se toma el primer dígito si es un número, o el curso completo si es algo como "JA01"
      let grado = /^\d/.test(est.curso) ? est.curso.charAt(0) : est.curso;

      if (!grupos[grado]) {
        grupos[grado] = [];
      }
      grupos[grado].push(est);
    });

    return grupos;
  }




function renderTabla(estudiantes) {
  const tbody = $("#tablaEstudiantes");
  tbody.empty();

  estudiantes.forEach((est) => {

const yaSeleccionado = estudiantesSeleccionados.some(
  e => String(e.id) === String(est.id)
);




  const checked = yaSeleccionado ? "checked" : "";


    const row = `
        <tr data-id="${est.id}">
            <td style="text-align: center; vertical-align: middle;">
              <input type="checkbox" class="chkEstudiante form-check-input" data-id="${est.id}" ${checked} />
            </td>
            <td>${est.nombre_estudiante}</td>
            <td>${est.curso}</td>
        </tr>`;
    tbody.append(row);
  });

  $(".chkEstudiante").on("change", function () {

    const id = $(this).data("id");
    const row = $(this).closest("tr");
    const nombre = row.find("td").eq(1).text();
    const curso = row.find("td").eq(2).text();

if (this.checked) {
  if (!estudiantesSeleccionados.some((e) => String(e.id) === String(id))) {
    estudiantesSeleccionados.push({ id: String(id), nombre, curso });
  }
} else {
  estudiantesSeleccionados = estudiantesSeleccionados.filter(
    (e) => String(e.id) !== String(id)
  );
}



    renderizarTabla(estudiantesSeleccionados);

    $("#totalPrice").text(estudiantesSeleccionados.length);
    console.log("Seleccionados:", estudiantesSeleccionados);
    
  });
    $("#chkTodos").off("change").on("change", function () {
    const marcarTodos = this.checked;
    $(".chkEstudiante").prop("checked", marcarTodos).trigger("change");
  });
  // Resetear el estado de chkTodos según los seleccionados actuales
const total = $(".chkEstudiante").length;
const seleccionados = $(".chkEstudiante:checked").length;
$("#chkTodos").prop("checked", total > 0 && total === seleccionados);

}


function renderizarTabla(estudiantes) {
  const contenedor = document.getElementById("tabla-container");
  contenedor.innerHTML = ""; // Limpiar contenido previo

  // Agrupar estudiantes por grado
  const grupos = agruparPorGrado(estudiantes);

  const tabla = document.createElement("table");
  tabla.className = "table table-bordered";

  // Encabezados
  const encabezado = document.createElement("tr");
  encabezado.innerHTML = "<th class='table-primary'>GRADO</th><td class='table-primary'>NOMBRE</td><td class='table-primary'>CURSO</td>";
  tabla.appendChild(encabezado);

  // Iterar sobre los grados
  for (let grado in grupos) {
    const estudiantesDelGrado = grupos[grado];
    estudiantesDelGrado.forEach((estudiante, index) => {
      const fila = document.createElement("tr");

      // Si es el primer estudiante del grado, insertamos la celda con rowspan
      if (index === 0) {
        const celdaGrado = document.createElement("th");
        celdaGrado.className = ('table-light center1');
        celdaGrado.rowSpan = estudiantesDelGrado.length;
        celdaGrado.textContent = grado;
        fila.appendChild(celdaGrado);
      }

      // Celda de datos del estudiante
      const celdaNombre = document.createElement("td");
      celdaNombre.textContent = estudiante.nombre;
      fila.appendChild(celdaNombre);

      const celdaCurso = document.createElement("td");
      celdaCurso.textContent = estudiante.curso;
      fila.appendChild(celdaCurso);

      tabla.appendChild(fila);
    });
  }

  contenedor.appendChild(tabla);
}












function download() {
  if (estudiantesSeleccionados.length === 0) {
    alert("No hay estudiantes seleccionados para exportar.");
    return;
  }

  const tema = document.getElementById("TemaE")?.value || "";

  // Convertir los datos a una matriz (array de arrays)
  const headers = ["id", "nombre", "curso"];
  const data = estudiantesSeleccionados.map(est => [est.id, est.nombre, est.curso]);

  // Crear hoja vacía
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Agregar tema en la fila 1 (A1)
  XLSX.utils.sheet_add_aoa(worksheet, [[tema]], { origin: "A1" });

  // Combinar A1:C1 para el tema
  worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];

  // Agregar encabezados y datos comenzando desde la fila 2
  XLSX.utils.sheet_add_aoa(worksheet, [headers, ...data], { origin: "A2" });

  // Establecer anchos de columna automáticos
  worksheet["!cols"] = [
    { wch: 10 }, // id
    { wch: 20 }, // nombre
    { wch: 10 }  // curso
  ];

  // Crear el libro
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");

  XLSX.writeFile(workbook, tema + ".xlsx");
}


