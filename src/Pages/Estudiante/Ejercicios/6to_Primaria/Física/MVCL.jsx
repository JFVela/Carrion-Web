import { useState, useEffect } from "react"
import { Circle, ArrowDown, ArrowUp } from 'lucide-react'

const MVCL = () => {
  const g = 10
  const [altura, setAltura] = useState(getRandomInt(10, 50))
  const [vi, setVi] = useState(getRandomInt(0, 15))
  const [vf, setVf] = useState(Math.sqrt(vi ** 2 + 2 * g * altura).toFixed(2))
  const [tiempo, setTiempo] = useState(((Math.sqrt(vi ** 2 + 2 * g * altura) - vi) / g).toFixed(2))
  const [respuesta, setRespuesta] = useState("")
  const [resultado, setResultado] = useState("")
  const [tipo, setTipo] = useState(["velocidad final", "tiempo", "altura"][getRandomInt(0, 2)])
  const [correcta, setCorrecta] = useState(null)
  const [direccion, setDireccion] = useState("baja") // "baja" o "sube"

  useEffect(() => {
    if (tipo === "velocidad final") {
      setCorrecta(Number.parseFloat(vf))
    } else if (tipo === "tiempo") {
      setCorrecta(Number.parseFloat(tiempo))
    } else {
      setCorrecta(altura)
    }
  }, [altura, vi, vf, tiempo, tipo])

  const comprobar = () => {
    const respuestaNum = Number.parseFloat(respuesta)
    const esCorrecta = Math.abs(respuestaNum - correcta) < 0.1
    setResultado(esCorrecta ? "¡Correcto!" : `Incorrecto. La respuesta correcta es ${correcta.toFixed(2)}`)
  }

  const generarNuevoProblema = () => {
    const nuevaAltura = getRandomInt(10, 50)
    const nuevoVi = getRandomInt(0, 15)
    const nuevaDireccion = ["baja", "sube"][getRandomInt(0, 1)]
    let nuevoVf, nuevoTiempo

    if (nuevaDireccion === "baja") {
      nuevoVf = Math.sqrt(nuevoVi ** 2 + 2 * g * nuevaAltura).toFixed(2)
      nuevoTiempo = ((Math.sqrt(nuevoVi ** 2 + 2 * g * nuevaAltura) - nuevoVi) / g).toFixed(2)
    } else {
      // Para movimiento hacia arriba
      nuevoVf = Math.sqrt(Math.max(0, nuevoVi ** 2 - 2 * g * nuevaAltura)).toFixed(2)
      nuevoTiempo = ((nuevoVi - Math.sqrt(Math.max(0, nuevoVi ** 2 - 2 * g * nuevaAltura))) / g).toFixed(2)
    }

    const nuevoTipo = ["velocidad final", "tiempo", "altura"][getRandomInt(0, 2)]

    setAltura(nuevaAltura)
    setVi(nuevoVi)
    setVf(nuevoVf)
    setTiempo(nuevoTiempo)
    setTipo(nuevoTipo)
    setDireccion(nuevaDireccion)
    setRespuesta("")
    setResultado("")
  }

  return (
    <div className="mvcl-container">
      <h2>MVCL (Movimiento Vertical con Caída Libre)</h2>

      <div className="problema">
        <p>
          {tipo === "velocidad final"
            ? `Un objeto ${direccion === "baja" ? "cae" : "se lanza hacia arriba"} desde una altura de ${altura} m con una velocidad inicial de ${vi} m/s. ¿Cuál es su velocidad ${direccion === "baja" ? "final" : "al llegar a esa altura"}?`
            : tipo === "tiempo"
              ? `Un objeto ${direccion === "baja" ? "cae" : "se lanza hacia arriba"} desde una altura de ${altura} m con una velocidad inicial de ${vi} m/s. ¿Cuánto tiempo tarda en ${direccion === "baja" ? "llegar al suelo" : "alcanzar esa altura"}?`
              : `Un objeto ${direccion === "baja" ? "cae" : "se lanza hacia arriba"} con una velocidad inicial de ${vi} m/s y alcanza una velocidad ${direccion === "baja" ? "final" : "en ese punto"} de ${vf} m/s. ¿${direccion === "baja" ? "Desde qué altura cayó" : "Qué altura alcanzó"}?`}
        </p>
        <div className="formula">
          Fórmula:{" "}
          {tipo === "distancia" || tipo === "altura" ? (
            <span>
              h ={" "}
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
              v<sub>f</sub> = v<sub>0</sub> {direccion === "baja" ? "+" : "-"} gt
            </span>
          )}
        </div>
      </div>

      <div className="visualizacion">
        <div className="escenario">
          <div className="linea-vertical"></div>

          {/* Pelotita superior */}
          <div className="pelotita superior">
            <Circle size={24} fill="#ff5722" color="#ff5722" />
            <div className="datos-punto">
              {direccion === "baja" ? (
                <>
                  <div>h = {tipo === "altura" ? "?" : `${altura} m`}</div>
                  <div>
                    v<sub>i</sub> = {vi} m/s
                  </div>
                </>
              ) : (
                <>
                  <div>h = {tipo === "altura" ? "?" : `${altura} m`}</div>
                  <div>
                    v<sub>f</sub> = {tipo === "velocidad final" ? "?" : vf} m/s
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Flecha */}
          <div className="flecha-container">
            {direccion === "baja" ? (
              <ArrowDown size={32} className="flecha" />
            ) : (
              <ArrowUp size={32} className="flecha" />
            )}
          </div>

          {/* Pelotita inferior */}
          <div className="pelotita inferior">
            <Circle size={24} fill="#ff5722" color="#ff5722" />
            <div className="datos-punto">
              {direccion === "baja" ? (
                <>
                  <div>h = 0 m</div>
                  <div>
                    v<sub>f</sub> = {tipo === "velocidad final" ? "?" : vf} m/s
                  </div>
                </>
              ) : (
                <>
                  <div>h = 0 m</div>
                  <div>
                    v<sub>i</sub> = {vi} m/s
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="gravedad">g = {g} m/s²</div>
          <br />
          <div className="gravedad">t = {tipo === "tiempo" ? "?" : `${tiempo} s`}</div>
        </div>
      </div>

      <div className="respuesta-container">
        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder={`Respuesta (${tipo === "velocidad final" ? "m/s" : tipo === "tiempo" ? "s" : "m"})`}
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
        .mvcl-container {
          background: linear-gradient(135deg, #f5f5ff 0%, #fff5f2 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(138, 43, 226, 0.1);
          border: 2px solid #9c27b0;
        }
        
        h2 {
          color: #9c27b0;
          text-align: center;
          margin-top: 0;
          border-bottom: 2px solid #e1bee7;
          padding-bottom: 10px;
        }
        
        .problema {
          background-color: #f3e5f5;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 6px rgba(156, 39, 176, 0.1);
        }
        
        .formula {
          font-weight: bold;
          color: #9c27b0;
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
          border-bottom: 1px solid #9c27b0;
        }

        .fraccion > span:last-child {
          display: block;
          padding: 0 3px;
        }
        
        .visualizacion {
          margin: 20px 0;
        }
        
        .escenario {
          height: 400px; /* Altura máxima de 200px como solicitado */
          background: linear-gradient(to bottom, #bbdefb, #90caf9);
          position: relative;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .linea-vertical {
          position: absolute;
          left: 50%;
          top: 10%;
          bottom: 10%;
          width: 2px;
          background-color: rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        
        .pelotita {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }
        
        .pelotita.superior {
          top: 20px;
        }
        
        .pelotita.inferior {
          bottom: 40px;
        }
        
        .flecha-container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        
        .flecha {
          color: #ff5722;
          filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.3));
        }
        
        .datos-punto {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 5px 10px;
          border-radius: 6px;
          margin-top: 5px;
          font-size: 14px;
          font-weight: bold;
          color: #9c27b0;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .gravedad {
          width: 150px;
          top: 10px;
          right: 10px;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 5px 10px;
          border-radius: 6px;
          font-weight: bold;
          color: #9c27b0;
          z-index: 2;
        }
        
        .tiempo {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-weight: bold;
          color: white;
          background-color: rgba(156, 39, 176, 0.7);
          padding: 8px;
          border-radius: 8px;
          margin: 0 20px;
          z-index: 2;
        }
        
        .respuesta-container {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        input {
          flex: 1;
          padding: 12px;
          border: 2px solid #e1bee7;
          border-radius: 8px;
          font-size: 16px;
          background-color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s;
        }
        
        input:focus {
          outline: none;
          border-color: #9c27b0;
          box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.2);
        }
        
        .boton-comprobar, .boton-generar {
          background: linear-gradient(to bottom, #ab47bc, #9c27b0);
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
          background: linear-gradient(to bottom, #9c27b0, #7b1fa2);
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
          background: linear-gradient(to bottom, #9c27b0, #7b1fa2);
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
          .mvcl-container {
            padding: 15px;
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
          .escenario {
            padding: 10px;
          }
          
          .gravedad {
            font-size: 12px;
            padding: 3px 6px;
          }
          
          .tiempo {
            font-size: 12px;
            padding: 6px;
            margin: 0 10px;
          }
          
          .datos-punto {
            font-size: 12px;
            padding: 4px 6px;
          }
        }
      `}</style>
    </div>
  )
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default MVCL
