import React, { useState, useEffect } from 'react';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const MRU = () => {
  const [velocidad, setVelocidad] = useState(getRandomInt(1, 20));
  const [tiempo, setTiempo] = useState(getRandomInt(1, 10));
  const [distancia, setDistancia] = useState(velocidad * tiempo);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');
  const [tipo, setTipo] = useState(['velocidad', 'tiempo', 'distancia'][getRandomInt(0, 2)]);
  const [correcta, setCorrecta] = useState(null);

  useEffect(() => {
    if (tipo === 'velocidad') {
      setCorrecta(distancia / tiempo);
    } else if (tipo === 'tiempo') {
      setCorrecta(distancia / velocidad);
    } else {
      setCorrecta(distancia);
    }
  }, [velocidad, tiempo, distancia, tipo]);

  const comprobar = () => {
    setResultado(parseFloat(respuesta) === correcta ? '¡Correcto!' : `Incorrecto. La respuesta correcta es ${correcta}`);
  };

  return (
    <div>
      <h2>MRU (Movimiento Rectilíneo Uniforme)</h2>
      <p>
        {tipo === 'velocidad'
          ? `Un objeto recorre ${distancia} m en ${tiempo} s. ¿Cuál es su velocidad?`
          : tipo === 'tiempo'
          ? `Un objeto se mueve a ${velocidad} m/s y recorre ${distancia} m. ¿Cuánto tiempo tarda?`
          : `Un objeto se mueve a ${velocidad} m/s durante ${tiempo} s. ¿Qué distancia recorre?`}
      </p>
      <p>Fórmula: {tipo === 'velocidad' ? 'v = d / t' : tipo === 'tiempo' ? 't = d / v' : 'd = v * t'}</p>
      <input 
        type="number" 
        value={respuesta} 
        onChange={(e) => setRespuesta(e.target.value)} 
        placeholder="Respuesta" 
      />
      <button onClick={comprobar}>Comprobar</button>
      <p>{resultado}</p>
    </div>
  );
};

const MRUV = () => {
  const [v0, setV0] = useState(getRandomInt(1, 15));
  const [a, setA] = useState(getRandomInt(1, 5));
  const [t, setT] = useState(getRandomInt(1, 10));
  const [vf, setVf] = useState(v0 + a * t);
  const [d, setD] = useState((v0 + vf) / 2 * t);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');
  const [tipo, setTipo] = useState(['velocidad final', 'distancia', 'velocidad inicial'][getRandomInt(0, 2)]);
  const [correcta, setCorrecta] = useState(null);

  useEffect(() => {
    if (tipo === 'velocidad final') {
      setCorrecta(vf);
    } else if (tipo === 'distancia') {
      setCorrecta(d);
    } else {
      setCorrecta(v0);
    }
  }, [v0, a, t, vf, d, tipo]);

  const comprobar = () => {
    setResultado(parseFloat(respuesta) === correcta ? '¡Correcto!' : `Incorrecto. La respuesta correcta es ${correcta}`);
  };

  return (
    <div>
      <h2>MRUV (Movimiento Rectilíneo Uniformemente Variado)</h2>
      <p>
        {tipo === 'velocidad final'
          ? `Un objeto parte a ${v0} m/s y acelera ${a} m/s² durante ${t} s. ¿Cuál es su velocidad final?`
          : tipo === 'distancia'
          ? `Un objeto parte a ${v0} m/s y acelera a ${a} m/s² durante ${t} s. ¿Qué distancia recorre?`
          : `Un objeto alcanza ${vf} m/s después de acelerar ${a} m/s² durante ${t} s. ¿Cuál era su velocidad inicial?`}
      </p>
      <p>Fórmula: {tipo === 'velocidad final' ? 'vf = v0 + a * t' : tipo === 'distancia' ? 'd = (v0 + vf) / 2 * t' : 'v0 = vf - a * t'}</p>
      <input 
        type="number" 
        value={respuesta} 
        onChange={(e) => setRespuesta(e.target.value)} 
        placeholder="Respuesta" 
      />
      <button onClick={comprobar}>Comprobar</button>
      <p>{resultado}</p>
    </div>
  );
};

const MVCL = () => {
  const g = 10;
  const [altura, setAltura] = useState(getRandomInt(10, 50));
  const [vi, setVi] = useState(getRandomInt(5, 15));
  const [vf, setVf] = useState(Math.sqrt(vi ** 2 + 2 * g * altura).toFixed(2));
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');

  const comprobar = () => {
    setResultado(parseFloat(respuesta) === parseFloat(vf) ? '¡Correcto!' : `Incorrecto. La respuesta correcta es ${vf}`);
  };

  return (
    <div>
      <h2>MVCL (Movimiento Vertical con Caída Libre)</h2>
      <p>Un objeto cae desde una altura de {altura} m con una velocidad inicial de {vi} m/s. ¿Cuál es su velocidad final?</p>
      <p>Fórmula: vf² = vi² + 2gh</p>
      <input 
        type="number" 
        value={respuesta} 
        onChange={(e) => setRespuesta(e.target.value)} 
        placeholder="Respuesta" 
      />
      <button onClick={comprobar}>Comprobar</button>
      <p>{resultado}</p>
    </div>
  );
};

const EjerciciosMRU_MRUV_MVCL = () => {
  return (
    <div>
      <MRU />
      <MRUV />
      <MVCL />
    </div>
  );
};

export default EjerciciosMRU_MRUV_MVCL;

