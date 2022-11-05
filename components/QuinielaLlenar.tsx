import React from "react";

type Props = {};

const QuinielaLlenar = ({ data }) => {
  return (
    <div>
      <h1>Tu Quiniela</h1>
      {data.map((ronda) => (
        <div key={ronda.id}>
          <h2>Ronda {ronda.Ronda}</h2>

          {ronda.data.map((fecha, i) => (
            <div>
              <div key={i}>
                <h3>Fecha: {ronda.data[i].Fecha}</h3>
              </div>
              {ronda.data[i].data.map((partido, j) => (
                <div key={j}>
                  <div>
                    <h4>Hora: {partido["TimeUtc"]}</h4>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuinielaLlenar;
