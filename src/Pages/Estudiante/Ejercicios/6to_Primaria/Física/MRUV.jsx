import { useState, useEffect } from "react";
import { Car, ArrowRight } from "lucide-react";

const MRUV = () => {
  const [v0, setV0] = useState(getRandomInt(1, 15));
  const [a, setA] = useState(getRandomInt(1, 5)); // Siempre positiva como solicitó
  const [t, setT] = useState(getRandomInt(1, 10));
  const [vf, setVf] = useState(v0 + a * t);
  const [d, setD] = useState(v0 * t + 0.5 * a * t * t);
  const [respuesta, setRespuesta] = useState("");
  const [resultado, setResultado] = useState("");
  const [tipo, setTipo] = useState(
    ["velocidad final", "distancia", "velocidad inicial"][getRandomInt(0, 2)]
  );
  const [correcta, setCorrecta] = useState(null);

  useEffect(() => {
    if (tipo === "velocidad final") {
      setCorrecta(vf);
    } else if (tipo === "distancia") {
      setCorrecta(d);
    } else {
      setCorrecta(v0);
    }
  }, [v0, a, t, vf, d, tipo]);

  const comprobar = () => {
    const respuestaNum = Number.parseFloat(respuesta);
    const esCorrecta = Math.abs(respuestaNum - correcta) < 0.1;
    setResultado(
      esCorrecta
        ? "¡Correcto!"
        : `Incorrecto. La respuesta correcta es ${correcta.toFixed(2)}`
    );
  };

  const generarNuevoProblema = () => {
    const nuevoV0 = getRandomInt(1, 15);
    const nuevoA = getRandomInt(1, 5); // Siempre positiva
    const nuevoT = getRandomInt(1, 10);
    const nuevoVf = nuevoV0 + nuevoA * nuevoT;
    const nuevoD = nuevoV0 * nuevoT + 0.5 * nuevoA * nuevoT * nuevoT;
    const nuevoTipo = ["velocidad final", "distancia", "velocidad inicial"][
      getRandomInt(0, 2)
    ];

    setV0(nuevoV0);
    setA(nuevoA);
    setT(nuevoT);
    setVf(nuevoVf);
    setD(nuevoD);
    setTipo(nuevoTipo);
    setRespuesta("");
    setResultado("");
  };

  return (
    <div className="mruv-container">
      <h2>MRUV (Movimiento Rectilíneo Uniformemente Variado)</h2>

      <div className="problema">
        <p>
          {tipo === "velocidad final"
            ? `Un objeto parte a ${v0} m/s y acelera ${a} m/s² durante ${t} s. ¿Cuál es su velocidad final?`
            : tipo === "distancia"
            ? `Un objeto parte a ${v0} m/s y acelera a ${a} m/s² durante ${t} s. ¿Qué distancia recorre?`
            : `Un objeto alcanza ${vf} m/s después de acelerar ${a} m/s² durante ${t} s. ¿Cuál era su velocidad inicial?`}
        </p>
        <div className="formula">
          Fórmula:{" "}
          {tipo === "distancia" ? (
            <span>
              d ={" "}
              <div className="fraccion">
                <span>
                  (v<sub>0</sub> + v<sub>f</sub>)
                </span>
                <span>2</span>
              </div>{" "}
              × t
            </span>
          ) : (
            <span>
              a ={" "}
              <div className="fraccion">
                <span>
                  (v<sub>f</sub> - v<sub>0</sub>)
                </span>
                <span>t</span>
              </div>
            </span>
          )}
        </div>
      </div>

      <div className="visualizacion">
        <div className="carretera">
          <div className="coche inicio">
            <Car size={32} />
            <div className="velocidad">
              {tipo === "velocidad inicial" ? "?" : `${v0} m/s`}
            </div>
          </div>

          <div className="aceleracion">
            <ArrowRight size={24} />
            <div className="valor-aceleracion">a = {a} m/s²</div>
          </div>

          <div className="coche fin">
            <Car size={32} />
            <div className="velocidad">
              {tipo === "velocidad final" ? "?" : `${vf} m/s`}
            </div>
          </div>

          <div className="segmento">
            <div className="linea"></div>
            <div className="valor">
              {tipo === "distancia" ? "?" : `${d.toFixed(1)} m`}
            </div>
            <div className="valor">
              Tiempo: {t} s
            </div>
          </div>
        </div>
      </div>

      <div className="respuesta-container">
        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder={`Respuesta (${
            tipo === "velocidad final" || tipo === "velocidad inicial"
              ? "m/s"
              : "m"
          })`}
        />
        <button className="boton-comprobar" onClick={comprobar}>
          Comprobar
        </button>
      </div>

      <p
        className={`resultado ${
          resultado.includes("Correcto")
            ? "correcto"
            : resultado
            ? "incorrecto"
            : ""
        }`}
      >
        {resultado}
      </p>

      <button className="boton-generar" onClick={generarNuevoProblema}>
        Generar Nuevo Problema
      </button>

      <style jsx>{`
        .mruv-container {
          background: linear-gradient(135deg, #f5f5ff 0%, #e6f7ff 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(138, 43, 226, 0.1);
          border: 2px solid #673ab7;
        }

        h2 {
          color: #673ab7;
          text-align: center;
          margin-top: 0;
          border-bottom: 2px solid #b39ddb;
          padding-bottom: 10px;
        }

        .problema {
          background-color: #ede7f6;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 6px rgba(103, 58, 183, 0.1);
        }

        .formula {
          font-weight: bold;
          color: #673ab7;
          font-style: italic;
          text-align: center;
          margin-top: 10px;
          font-size: 1.2em;
        }

        .fraccion {
          display: inline-block;
          vertical-align: middle;
          text-align: center;
          margin: 0 5px;
        }

        .fraccion > span:first-child {
          display: block;
          padding: 0 3px;
          border-bottom: 1px solid #673ab7;
        }

        .fraccion > span:last-child {
          display: block;
          padding: 0 3px;
        }

        .visualizacion {
          margin: 20px 0;
        }

        .carretera {
          height: 180px;
          background: #f5f5f5;
          position: relative;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .coche {
          position: absolute;
          color: #673ab7;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .coche.inicio {
          left: 20px;
          top: 20px;
        }

        .coche.fin {
          right: 20px;
          top: 20px;
        }

        .velocidad {
          font-size: 14px;
          font-weight: bold;
          margin-top: 5px;
          color: #673ab7;
          background-color: rgba(103, 58, 183, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .aceleracion {
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ff5722;
        }

        .valor-aceleracion {
          font-size: 14px;
          font-weight: bold;
          margin-top: 5px;
          color: #ff5722;
        }

        .segmento {
          position: absolute;
          top: 100px;
          left: 50px;
          right: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .linea {
          height: 3px;
          width: 100%;
          background-color: #673ab7;
          position: relative;
        }

        .linea:before,
        .linea:after {
          content: "";
          position: absolute;
          width: 3px;
          height: 10px;
          background-color: #673ab7;
        }

        .linea:before {
          left: 0;
          top: -3px;
        }

        .linea:after {
          right: 0;
          top: -3px;
        }

        .valor {
          font-weight: bold;
          color: #673ab7;
          margin-top: 5px;
          background-color: rgba(103, 58, 183, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .tiempo {
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          text-align: center;
          font-weight: bold;
          color: #673ab7;
          background-color: rgba(103, 58, 183, 0.1);
          padding: 8px;
          border-radius: 8px;
          margin: 0 20px;
        }

        .respuesta-container {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        input {
          flex: 1;
          padding: 12px;
          border: 2px solid #b39ddb;
          border-radius: 8px;
          font-size: 16px;
          background-color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #673ab7;
          box-shadow: 0 0 0 3px rgba(103, 58, 183, 0.2);
        }

        .boton-comprobar,
        .boton-generar {
          background: linear-gradient(to bottom, #7e57c2, #673ab7);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .boton-comprobar:hover,
        .boton-generar:hover {
          background: linear-gradient(to bottom, #673ab7, #5e35b1);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .boton-comprobar:active,
        .boton-generar:active {
          transform: translateY(0);
        }

        .boton-generar {
          width: 100%;
          margin-top: 10px;
          font-size: 16px;
          background: linear-gradient(to bottom, #673ab7, #5e35b1);
        }

        .resultado {
          text-align: center;
          font-weight: bold;
          min-height: 24px;
          margin: 15px 0;
          padding: 10px;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .correcto {
          color: #4caf50;
          background-color: rgba(76, 175, 80, 0.1);
        }

        .incorrecto {
          color: #f44336;
          background-color: rgba(244, 67, 54, 0.1);
        }

        @media (max-width: 768px) {
          .mruv-container {
            padding: 15px;
          }

          .carretera {
            height: 200px;
            padding: 15px;
          }

          .coche.inicio {
            left: 10px;
          }

          .coche.fin {
            right: 10px;
          }

          .segmento {
            left: 40px;
            right: 40px;
          }

          .tiempo {
            margin: 0 10px;
          }

          .respuesta-container {
            flex-direction: column;
            gap: 8px;
          }

          .boton-comprobar,
          .boton-generar {
            width: 100%;
            padding: 10px;
          }

          .formula {
            font-size: 1em;
          }
        }

        @media (max-width: 480px) {
          .carretera {
            height: 220px;
          }

          .coche.inicio,
          .coche.fin {
            top: 15px;
          }

          .aceleracion {
            top: 60px;
          }

          .segmento {
            top: 120px;
          }

          .tiempo {
            padding: 6px;
            font-size: 0.9em;
          }
        }
      `}</style>
    </div>
  );
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default MRUV;
