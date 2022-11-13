import MUIDataTable from "mui-datatables";
import Avatar from "@material-ui/core/Avatar";
import Link from "next/link";
import firebase from "../firebase/firebaseClient";

const columns = [
  {
    name: "position",
    label: "Posición",
    options: {
      filter: true,
      sort: true,
      sorted: true,
    },
  },
  {
    name: "foto",
    label: "Foto de Perfil",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "name",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "puntos",
    label: "Puntos",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "detalles",
    label: "Detalles",
    options: {
      filter: false,
      sort: false,
    },
  },
];

export default function Marcadores({ users, resultados }) {
  let data = [];
  let userResults = [];

  let homeScores = [];
  let awayScores = [];

  let realHomeScores = [];
  let realAwayScores = [];

  for (let i = 1; i <= 48; i++) {
    realHomeScores.push(
      resultados[i].local[Object.keys(resultados[i].local)[0]]
    );
    realAwayScores.push(
      resultados[i].visitante[Object.keys(resultados[i].visitante)[0]]
    );
  }

  users.forEach((user, index) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("quiniela")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          userResults.push(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  users.map((user, index) => {
    data.push({
      position: index + 1,
      foto: <Avatar alt={user.name} src={user.photoUrl}></Avatar>,
      name: user.name,
      puntos: user.puntos,
      detalles: (
        <Link href={`/users/${user.uid}`}>
          <a className=" underline">Ver detalles</a>
        </Link>
      ),
    });
  });

  return (
    <div className="rounded-xl lg:m-5 mx-0 my-5">
      <MUIDataTable
        title={"Tabla de Posiciones 🏆"}
        data={data}
        columns={columns}
        options={{
          selectableRows: "none",
          viewColumns: true,
          rowsPerPage: 10,
          rowsPerPageOptions: [10, 20, 100],
          responsive: "standard",
          textLabels: {
            body: {
              noMatch: "No se encontraron registros",
              toolTip: "Ordenar",
              columnHeaderTooltip: (column) => `Ordenar para ${column.label}`,
            },
            pagination: {
              next: "Siguiente Página",
              previous: "Página Anterior",
              rowsPerPage: "Filas por página:",
              displayRows: "de",
            },
            toolbar: {
              search: "Buscar",
              downloadCsv: "Descargar CSV",
              print: "Imprimir",
              viewColumns: "Ver Columnas",
              filterTable: "Filtrar Tabla",
            },
            filter: {
              all: "Todos",
              title: "FILTROS",
              reset: "RESETEAR",
            },
            viewColumns: {
              title: "Mostrar Columnas",
              titleAria: "Mostrar/Ocultar Columnas de Tabla",
            },
            selectedRows: {
              text: "fila(s) seleccionada(s)",
              delete: "Borrar",
              deleteAria: "Borrar Filas Seleccionadas",
            },
          },
        }}
      />
    </div>
  );
}
