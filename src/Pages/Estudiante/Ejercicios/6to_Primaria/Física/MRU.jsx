import { useState, useEffect } from "react"
import { Car } from "lucide-react"

const MRU = () => {
  const [velocidad, setVelocidad] = useState(getRandomInt(1, 20))
  const [tiempo, setTiempo] = useState(getRandomInt(1, 10))
  const [distancia, setDistancia] = useState(velocidad * tiempo)
  const [respuesta, setRespuesta] = useState("")
  const [resultado, setResultado] = useState("")
  const [tipo, setTipo] = useState(["velocidad", "tiempo", "distancia"][getRandomInt(0, 2)])
  const [correcta, setCorrecta] = useState(null)

  useEffect(() => {
    if (tipo === "velocidad") {
      setCorrecta(distancia / tiempo)
    } else if (tipo === "tiempo") {
      setCorrecta(distancia / velocidad)
    } else {
      setCorrecta(distancia)
    }
  }, [velocidad, tiempo, distancia, tipo])

  const comprobar = () => {
    const respuestaNum = Number.parseFloat(respuesta)
    const esCorrecta = Math.abs(respuestaNum - correcta) < 0.1
    setResultado(esCorrecta ? "¡Correcto!" : `Incorrecto. La respuesta correcta es ${correcta.toFixed(2)}`)
  }

  const generarNuevoProblema = () => {
    const nuevoVelocidad = getRandomInt(1, 20)
    const nuevoTiempo = getRandomInt(1, 10)
    const nuevaDistancia = nuevoVelocidad * nuevoTiempo
    const nuevoTipo = ["velocidad", "tiempo", "distancia"][getRandomInt(0, 2)]

    setVelocidad(nuevoVelocidad)
    setTiempo(nuevoTiempo)
    setDistancia(nuevaDistancia)
    setTipo(nuevoTipo)
    setRespuesta("")
    setResultado("")
  }

  return (
    <div className="mru-container">
      <h2>MRU (Movimiento Rectilíneo Uniforme)</h2>

      <div className="problema">
        <p>
          {tipo === "velocidad"
            ? `Un objeto recorre ${distancia} m en ${tiempo} s. ¿Cuál es su velocidad?`
            : tipo === "tiempo"
              ? `Un objeto se mueve a ${velocidad} m/s y recorre ${distancia} m. ¿Cuánto tiempo tarda?`
              : `Un objeto se mueve a ${velocidad} m/s durante ${tiempo} s. ¿Qué distancia recorre?`}
        </p>
        <div className="formula">Fórmula: d = v × t</div>
      </div>

      <div className="visualizacion">
        <div className="carretera">
          <div className="coche inicio">
            <Car size={32} />
            <div className="etiqueta">Inicio</div>
          </div>

          <div className="segmento">
            <div className="linea"></div>
            <div className="valor">{tipo === "distancia" ? "?" : `${distancia} m`}</div>
          </div>

          <div className="coche fin">
            <Car size={32} />
            <div className="etiqueta">Fin</div>
          </div>

          <div className="datos">
            <div className="dato">
              <span>Velocidad:</span>
              <span>{tipo === "velocidad" ? "?" : `${velocidad} m/s`}</span>
            </div>
            <div className="dato">
              <span>Tiempo:</span>
              <span>{tipo === "tiempo" ? "?" : `${tiempo} s`}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="respuesta-container">
        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder={`Respuesta (${tipo === "velocidad" ? "m/s" : tipo === "tiempo" ? "s" : "m"})`}
        />
        <button className="boton-comprobar" onClick={comprobar}>
          Comprobar
        </button>
      </div>

      <p className={`resultado ${resultado.includes("Correcto") ? "correcto" : resultado ? "incorrecto" : ""}`}>
        {resultado}
      </p>

      <button className="boton-generar" onClick={generarNuevoProblema}>
        Generar Nuevo Problema
      </button>

      <style jsx>{`
        .mru-container {
          background: linear-gradient(135deg, #f8f5ff 0%, #e6f0ff 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(138, 43, 226, 0.1);
          border: 2px solid #8a2be2;
        }
        
        h2 {
          color: #6a0dad;
          text-align: center;
          margin-top: 0;
          border-bottom: 2px solid #d8c2ff;
          padding-bottom: 10px;
        }
        
        .problema {
          background-color: #f0e6ff;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 6px rgba(106, 13, 173, 0.1);
        }
        
        .formula {
          font-weight: bold;
          color: #6a0dad;
          font-style: italic;
          text-align: center;
          margin-top: 10px;
          font-size: 1.2em;
        }
        
        .visualizacion {
          margin: 20px 0;
        }
        
        .carretera {
          height: 120px;
          background: #f5f5f5;
          position: relative;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .coche {
          position: absolute;
          color: #8a2be2;
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
        
        .etiqueta {
          font-size: 12px;
          font-weight: bold;
          margin-top: 5px;
          color: #6a0dad;
        }
        
        .segmento {
          position: absolute;
          top: 50px;
          left: 50px;
          right: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .linea {
          height: 3px;
          width: 100%;
          background-color: #8a2be2;
          position: relative;
        }
        
        .linea:before, .linea:after {
          content: '';
          position: absolute;
          width: 3px;
          height: 10px;
          background-color: #8a2be2;
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
          color: #6a0dad;
          margin-top: 5px;
          background-color: rgba(138, 43, 226, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }
        
        .datos {
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          background-color: rgba(138, 43, 226, 0.1);
          padding: 8px;
          border-radius: 8px;
          margin: 0 20px;
        }
        
        .dato {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .dato span:first-child {
          font-size: 0.9em;
          color: #6a0dad;
        }
        
        .dato span:last-child {
          font-weight: bold;
          font-size: 1.1em;
          color: #8a2be2;
        }
        
        .respuesta-container {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        input {
          flex: 1;
          padding: 12px;
          border: 2px solid #d8c2ff;
          border-radius: 8px;
          font-size: 16px;
          background-color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s;
        }
        
        input:focus {
          outline: none;
          border-color: #8a2be2;
          box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.2);
        }
        
        .boton-comprobar, .boton-generar {
          background: linear-gradient(to bottom, #9c27b0, #8a2be2);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .boton-comprobar:hover, .boton-generar:hover {
          background: linear-gradient(to bottom, #8a2be2, #6a0dad);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .boton-comprobar:active, .boton-generar:active {
          transform: translateY(0);
        }
        
        .boton-generar {
          width: 100%;
          margin-top: 10px;
          font-size: 16px;
          background: linear-gradient(to bottom, #8a2be2, #6a0dad);
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
          .mru-container {
            padding: 15px;
          }
          
          .carretera {
            height: 150px;
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
          
          .datos {
            margin: 0 10px;
          }
          
          .respuesta-container {
            flex-direction: column;
            gap: 8px;
          }
          
          .boton-comprobar, .boton-generar {
            width: 100%;
            padding: 10px;
          }
          
          .formula {
            font-size: 1em;
          }
        }
        
        @media (max-width: 480px) {
          .carretera {
            height: 180px;
          }
          
          .coche.inicio, .coche.fin {
            top: 15px;
          }
          
          .segmento {
            top: 70px;
          }
          
          .datos {
            padding: 6px;
            font-size: 0.9em;
          }
        }
      `}</style>
    </div>
  )
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default MRU
