"use client";

import { useState } from "react";
import somar from "./functions";

const Funcao = () => {
  const [valor1, setValor1] = useState(""); // Cria um estado chamado 'valor1', inicializado como string vazia. 'setValor1' é a função para atualizar esse valor.
  const [valor2, setValor2] = useState(""); // Mesmo que acima, mas para o segundo valor a ser somado.

  const isNumeric = (val: string) => !isNaN(Number(val)) && val.trim() !== "";
  //? Função que verifica se o valor é um número:
  // - Primeiro, converte 'val' para número usando Number(val)
  // - Usa isNaN() para verificar se o resultado NÃO é NaN (ou seja, é um número)
  // - Também garante que o valor não seja só espaços em branco com val.trim() !== ""

  const mostrarResultado = valor1 !== "" && valor2 !== "";
  // Variável booleana que verifica se os dois campos foram preenchidos (ou seja, diferentes de vazio)

  const resultadoValido =
    mostrarResultado && isNumeric(valor1) && isNumeric(valor2)
      ? somar(Number(valor1), Number(valor2)) // Se os dois campos foram preenchidos E são numéricos, faz a soma com a função 'somar'
      : mostrarResultado
      ? "Digite números válidos." // Se os campos foram preenchidos, mas algum não é número, mostra a mensagem de erro
      : ""; // Se os campos ainda estão vazios, não exibe nada

  return (
    <div className="text-center">
      <h1>Qual primeiro valor você deseja somar?</h1>
      <input
        className="border-black border-2 px-2 py-1 rounded"
        type="text"
        value={valor1}
        onChange={(e) => setValor1(e.target.value)}
      />
      <br />
      <h1>Qual segundo valor você deseja somar?</h1>
      <input
        className="border-black border-2 px-2 py-1 rounded"
        type="text"
        value={valor2}
        onChange={(e) => setValor2(e.target.value)}
        maxLength={2}
      />

      {resultadoValido && (
        <h1 className="mt-4 text-xl font-semibold">
          Resultado: {resultadoValido}
        </h1>
      )}
    </div>
  );
};

export default Funcao;
