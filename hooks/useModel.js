import { useState, useEffect } from 'react';

export function useModel(inputString) {
  const [outputMo, setOutput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const classifyText = async () => {
      try {
        setLoading(true);
        let jsonRes = { "texto": inputString }
        console.log(`Clasificando el texto: ${jsonRes["texto"]}`);

        // Hacer la solicitud a la API
        const response = await fetch('https://apimodelonlp.onrender.com/clasificar', {  // Cambia 'localhost' por tu IP si es necesario
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Asegúrate de incluir el encabezado correcto
          },
          body: JSON.stringify({ "texto": inputString }), // Asegúrate de que el cuerpo de la solicitud coincida con lo que espera tu API
        });
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }

        const data = await response.json();

        // Procesar la respuesta
        if (data.resultado_0 && data.resultado_1) {
          setOutput(data); // True si es violento, False si no
          console.log('data resuelta', data);
        } else {
          setOutput(null); // O maneja el caso en que no se reciba un resultado válido
        }
      } catch (err) {
        console.error("Error al clasificar el texto:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (inputString) {
      classifyText();
    }
  }, [inputString]);

  return { outputMo, loading, error };
}
