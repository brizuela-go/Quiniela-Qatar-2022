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

export default function Marcadores({ users, resultados, usersQuiniela }) {
  let data = [];

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
    let points = 0;

    for (let i = 1; i <= 48; i++) {
      homeScores.push(
        parseInt(
          usersQuiniela[index].resultados[i].local[
            Object.keys(resultados[i].local)[0]
          ]
        )
      );
      awayScores.push(
        parseInt(
          usersQuiniela[index].resultados[i].visitante[
            Object.keys(resultados[i].visitante)[0]
          ]
        )
      );
    }

    // separate the array every 48 elements
    let homeScoresSeparated = homeScores.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 48);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk

        resultArray[chunkIndex].push(item);
      } else {
        resultArray[chunkIndex].push(item);
      }

      return resultArray;
    }, []);

    let awayScoresSeparated = awayScores.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 48);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk

        resultArray[chunkIndex].push(item);
      } else {
        resultArray[chunkIndex].push(item);
      }

      return resultArray;
    }, []);

    for (let i = 0; i < realHomeScores.length; i++) {
      if (realHomeScores[i] !== null && realAwayScores[i] !== null) {
        if (
          homeScoresSeparated[index][i] > awayScoresSeparated[index][i] &&
          realHomeScores[i] > realAwayScores[i]
        ) {
          points +=
            10 -
            (Math.abs(realHomeScores[i] - homeScoresSeparated[index][i]) +
              Math.abs(realAwayScores[i] - awayScoresSeparated[index][i]));
        } else if (
          homeScoresSeparated[index][i] < awayScoresSeparated[index][i] &&
          realHomeScores[i] < realAwayScores[i]
        ) {
          points +=
            10 -
            (Math.abs(realHomeScores[i] - homeScoresSeparated[index][i]) +
              Math.abs(realAwayScores[i] - awayScoresSeparated[index][i]));
        } else if (
          homeScoresSeparated[index][i] === awayScoresSeparated[index][i] &&
          realHomeScores[i] === realAwayScores[i]
        ) {
          points +=
            10 -
            (Math.abs(realHomeScores[i] - homeScoresSeparated[index][i]) +
              Math.abs(realAwayScores[i] - awayScoresSeparated[index][i]));
        }
      }
    }

    firebase.firestore().collection("users").doc(user.uid).update({
      puntos: points,
    });
  });

  // create positions, if two users have the same points, they will have the same position
  let positions = [];
  let position = 1;
  let lastPoints = 0;

  users.forEach((user, index) => {
    if (index === 0) {
      positions.push(position);
      lastPoints = user.puntos;
    } else {
      if (user.puntos === lastPoints) {
        positions.push(position);
      } else {
        position++;
        positions.push(position);
        lastPoints = user.puntos;
      }
    }
  });

  users.map((user, index) => {
    data.push({
      position: positions[index],
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
