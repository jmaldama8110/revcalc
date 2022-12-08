import { RangeSlider } from "./RangeSlider";
import "./RangeSlider.css";
import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [values] = useState([1000,3000,5000,8000,10000,15000,20000,25000,30000,50000])
  const [min] = useState(0);
  const [max] = useState(values.length - 1);
  const [position, setPosition] = useState(2);
  const [capital, setCapital] = useState(values[2]);
  
  const [total, setTotal] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [terms, setTerms] = useState([])

/**
 *  1. tabla
 *  2. botones en 3D
 *  3. Diferentes numeros de whatsapp??
 */

  function onSliderUpdate(e) {
    setPosition(e.target.value);
    setCapital(values[e.target.value]);
  }

  function updateTerms (capitalValue){
    const newArray = [];
    
    let retiro = 0, porcentaje = 0;
    for(let i = 0; i <= 15; i++){
      newArray.push({
        retiro: '-', porcentaje:''
      })
    }
    porcentaje = 2.1
    retiro = capitalValue * porcentaje
    newArray.push({
      retiro: formatLocalCurrency(retiro,"","",""),
      porcentaje: `${formatLocalCurrency(porcentaje*100, "","","")}%`
    });

    porcentaje = 0.09
    retiro = capitalValue * porcentaje
    for( let i=0; i<=10; i++){
      newArray.push({
        retiro: formatLocalCurrency(retiro,"","",""),
        porcentaje: `${formatLocalCurrency(porcentaje*100, "","","")}%`
      })
    }
    setTerms(newArray);
  }

  const formatLocalCurrency = (numero, currencySy, fractionSy,decimalSy) => {
    const formmatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    });

    const numberString = formmatter
      .formatToParts(numero)
      .map(({ type, value }) => {
        
        switch (type) {
          case "currency":
            return currencySy;
          case "fraction":
            return fractionSy;
          case "decimal":
            return decimalSy;
          default:
            return value;
        }
      })
      .reduce((string, part) => string + part );

    return numberString;
  };

  useEffect( ()=>{
    /// Updates everytime Value is set
    const totl = capital * 3;
    const rev = totl - capital
    setTotal(totl);
    setRevenue(rev);

    updateTerms(capital);

  },[position])

  return (
    <div className="AppContainer">
      <h2>Calculadora de Ganancias</h2>
      <h3>{formatLocalCurrency(capital,"$","","")} usd</h3>
      <RangeSlider
        min={min}
        max={max}
        value={position}
        onUpdateHandler={onSliderUpdate}
        step={1}
      />

      <div className="table-container">
        <div className="table-header mg">
          <p className="s1">Mes</p>
          <p className="s2">Retiros USD</p>
          <p className="s3">Porcentaje</p>
        </div>
      {

        terms.map( (i,n)=>(
          <div key={n} className='table-row mg'>
            <p className="s1">{n}</p>
            <p className="s2">{i.retiro}</p>
            <p className="s3">{i.porcentaje}</p>
          </div>
        ))
      }

      </div>
      
      <h4>Retorno: {formatLocalCurrency(total,"$","","")} usd</h4>
      <h4>Ganancia: {formatLocalCurrency(revenue, "$","","")} usd</h4>
      <a className='button-whatsapp' href="https://wa.me/+529612943423?text=Hola,%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20de%20c%C3%B3mo%20invertir%20con%20la%20calculadora%20de%20ganancias">
        WhatsApp me
      </a>
    </div>
  );
}

export default App;
