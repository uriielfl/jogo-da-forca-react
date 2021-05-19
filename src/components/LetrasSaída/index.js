import React from "react";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import Forca from "../Forca";

const LetrasSaida = () => {
  const wordLetters = useSelector((state) => state.word); // Letras correspondentes a palavra correta(uma palavra aleatória do store)
  const buttonLetters = useSelector((state) => state.lettersButton); // Letras que vão para os botões
  const lettersClicked = useSelector((state) => state.lettersClicked); // Letras clicadas pelo usuário
  const maxErrors = 5; // Máximo de letras erradas que o usuário pode clicar
  let wordLetterString = ""; // Irá receber a palavra escolhida em formatado como uma string
  let errors = 0; // Erros iniciais
  let corrects = 0; // Acertos iniciais

  for (let i = 0; i < lettersClicked.length; i++) { // Checa se, a letra clicada pelo usuário, está dentro do
    if (!wordLetters.includes(lettersClicked[i])) { // array de letras referente a palavra correta. 
      errors = errors + 1; // Se não estiver, "errors" ganha mais 1
    } else { 
      corrects = corrects + 1; // Do contrário, "corrects" ganha mais 1 
    }
  }

  for (let j = 0; j < wordLetters.length; j++) { // A variável iniciada como vazia, recebe os elements do array que
    wordLetterString = wordLetterString + wordLetters[j]; // guarda as letras corretas referentes a palavra correta
  }

  const dispatch = useDispatch(); // Recebe useDispatch

  const handleLetterInWord = (letter) => { // Adiciona a letra clicada pelo usuário em "state.lettersClicked"
    dispatch({ type: "ADD_LETTER", title: letter });
  };

  const showLetter = (wordLetter) => { // Faz a condição para mostrar a letra, caso seja a letra correta, para o usuário
    if (lettersClicked.includes(wordLetter)) {
      return wordLetter;
    }
    return ""; 
  };

  const checkWinOrLose = () => { // Mostra uma mensagem de acerto ou erro para o usuário relativos, respectivamente, a "corrects" e "errors"
    if (corrects === wordLetterString.length) {
      return (
        <div className="error-or-win-msg">
          <h3>Ganhou!</h3>
          <span>
            <p> A palavra era: " {wordLetters} "</p>
          </span>
        </div>
      );
    } else if (errors === maxErrors) {
      return (
        <div className="error-or-win-msg">
          <h3>Perdeu</h3>
          <span>
            <p> A palavra era: " {wordLetters} "</p>
          </span>
        </div>
      );
    }
  };

  return (
    <div className="container-total">
      <div className="forca">
        <Forca errors={errors} /> {/* Passa "errors" como props para o component Forca */}
      </div>
      {checkWinOrLose()}
      <div className="container-letras">
        {wordLetters.map((wordLetter) => (
          <input
            key={wordLetter}
            defaultValue={showLetter(wordLetter)}
            disabled
          ></input>
        ))}
      </div>
      <div className="container-botoes">
        {buttonLetters.map((botaoLetra) => (
          <button
            onClick={() => handleLetterInWord(botaoLetra)}
            disabled={
              errors === maxErrors ? true : lettersClicked.includes(botaoLetra)
            }
          >
            {botaoLetra}
          </button>
        ))}
      </div>
      <div className="errors">
        <span>Chances: {maxErrors - errors}</span>
      </div>
    </div>
  );
};

export default LetrasSaida;
