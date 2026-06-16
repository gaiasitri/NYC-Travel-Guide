// dichiarazione variabili globali
/**/ var nodoNumeroDomanda;
/**/ var nodoTestoDomanda;
/**/ var nodoRisposta0;
/**/ var nodoTestoRisposta0;
/**/ var nodoRisposta1;
/**/ var nodoTestoRisposta1;
/**/ var nodoRisposta2;
/**/ var nodoTestoRisposta2;

/**/ var nodoAvanti;
/**/ var nodoRisultato;
/**/ var nodoInizia;
/**/ var numeroDomande;
/**/ var numeroDomandaCorrente;
/**/ var risposteDate;
 
//Nella prima parte della funzione gestoreLoad si identificano tutti i nodi che saranno
//interessati agli eventi, utilizzando gli identificatori che compaiono nel documento HTML come valore dell’attributo id degli elementi interattivi. 
//Ad ogni nodo è associato, tramite l’opportuno attributo, il nome del gestore dell’evento che si
//prenderà cura dell’evento stesso, al momento della sua generazione. Nella seconda parte della funzione si inizializzano tutte le variabili globali dichiarate ma
//non inizializzate nel codice JavaScript.

/**/ function gestoreLoad () { //funzione principale assegna alle variabili globali dichiarate sopra l'elemento che si trova nel file html
/**/  try {
/**/      nodoNumeroDomanda = document.getElementById("numeroDomanda");
/**/      nodoTestoDomanda = document.getElementById("testoDomanda");
/**/      nodoRisposta0 = document.getElementById("risposta0");
/**/      nodoTestoRisposta0 = document.getElementById("testoRisposta0");
/**/      nodoRisposta1 = document.getElementById("risposta1");
/**/      nodoTestoRisposta1 = document.getElementById("testoRisposta1");
/**/      nodoRisposta2 = document.getElementById("risposta2");
/**/      nodoTestoRisposta2 = document.getElementById("testoRisposta2");
/**/      nodoAvanti = document.getElementById("avanti");
/**/      nodoRisultato = document.getElementById("risultato");
/**/      nodoInizia = document.getElementById("inizia");
/**/      nodoAvanti.onclick = gestoreClickAvanti;
/**/      nodoInizia.onclick = gestoreClickInizia;
/**/      numeroDomande = quiz.length;
/**/      nuovoQuiz();
/**/   } catch ( e ) {
/**/      alert("gestoreLoad " + e);
/**/   }
/**/ }
/**/ window.onload = gestoreLoad; //quando la finestra viene caricata lo script viene fatto partire

// La funzione fa partire il quiz dall'inizio
/**/ function nuovoQuiz () {
/**/      numeroDomandaCorrente = 0; //azzero la variabile 
/**/      aggiornaDomanda(numeroDomandaCorrente); //invoco questa funzione affinchè l'utente visualizzi la prima domanda
/**/      scriviMessaggio(nodoRisultato, "");
/**/      risposteDate = [];
}

// La funzione passa alla domanda successiva dopo che l'utente ha selezionato la risposta e cliccato sul pulsante Avanti
/**/ function aggiornaDomanda (i) {
/**/   scriviMessaggio(nodoNumeroDomanda, 
                   (i + 1) + " / " + numeroDomande); //  1/4
/**/   var parte = quiz[i]; //che contiene le domande con le tre risposte
/**/   scriviMessaggio(nodoTestoDomanda, parte.domanda)
/**/   scriviMessaggio(nodoTestoRisposta0, parte.risposte[0]);
/**/   scriviMessaggio(nodoTestoRisposta1, parte.risposte[1]);
/**/   scriviMessaggio(nodoTestoRisposta2, parte.risposte[2]);
/**/   nodoRisposta0.checked = false;
/**/   nodoRisposta1.checked = false;
/**/   nodoRisposta2.checked = false;
      }
// contenuti (domande, risposte e il numero della risposta esatta) codificati nella variabile quiz
/**/ var quiz = [
{ // domanda 1
domanda : "When was The American Museum of Natural History founded?", risposte : [
                   "1869",
                   "1769",
                   "1969"
                  ],
      rispostaEsatta : 0
   },
   {  // domanda 2
   domanda : "What is the best place to eat Pastrami?", risposte : [
                   "Peter Luger",
                   "Freemans",
                   "Kat'z"
                  ],
      rispostaEsatta : 2
   },
   {  // domanda 3
domanda : "Times Square is:", risposte : [
                   "Beaux Arts edifice",
                   "A Bridge",
                   "A major commercial intersection"
                  ],
      rispostaEsatta : 2
   },
   {  // domanda 4
domanda : "What is Grand Cental Terminal?", risposte : [
                   "A museum",
                   "A station",
                   "A library"
                  ],
      rispostaEsatta : 1
} 
];

// la funzione fa comparire il testo
/**/ function scriviMessaggio (nodo, messaggio) { 
/**/   var nodoTesto = document.createTextNode(messaggio);
/**/   if (nodo.childNodes.length == 0) {
/**/      nodo.appendChild(nodoTesto);
/**/   } else {
/**/      nodo.replaceChild(nodoTesto, nodo.firstChild);
/**/   }
/**/ }

// la funzione verifica quale sia la risposta data dall'utente 
// se il quiz è terminato la funzione invoca calcolaEsito e visualizza il risultato
/**/ function gestoreClickAvanti () {
/**/   try {
/**/      if (numeroDomandaCorrente == numeroDomande) { // se siamo arrivati a fine quiz, il click sul pulsante avanti viene ignorato
/**/         return;
/**/      }
/**/      if (nodoRisposta0.checked) {  // altrimenti identifica la risposta data dall'utente e la memorizza nell'Array risposteDate
/**/         risposteDate[numeroDomandaCorrente] = 0;
/**/      } else if (nodoRisposta1.checked) {
/**/         risposteDate[numeroDomandaCorrente] = 1;
/**/      } else if (nodoRisposta2.checked) {
/**/         risposteDate[numeroDomandaCorrente] = 2;
/**/      } else {
/**/         return; 
/**/      }
/**/      numeroDomandaCorrente++; //scorro alla domanda successiva
/**/      if (numeroDomandaCorrente == numeroDomande) { //verifico se il quiz è terminato
/**/         var esito = calcolaEsito(); //invoco la funzione calcolaEsito
/**/         var s;
/**/         if (esito == 1) {
/**/            s = "1 risposta esatta su " + numeroDomande; //stampo l'esito (es: 1 risposta esatta su 4)
/**/         } else {
/**/            s = esito + " risposte esatte su " + numeroDomande; //stampo l'esito
/**/         }
/**/         scriviMessaggio(nodoRisultato, s);
/**/      } else {
/**/         aggiornaDomanda(numeroDomandaCorrente);
/**/      }
/**/   } catch ( e ) {
/**/      alert("gestoreClickAvanti " + e);
/**/      } 
/**/   }
// La funzione scorre l'array quiz e confronta le risposte che da l'utente con quelle esatte
/**/ function calcolaEsito () {
/**/     var numeroRisposteEsatte = 0;
/**/     for (var i = 0; i < quiz.length; i++) {
/**/     var parte = quiz[i];
/**/     if (parte.rispostaEsatta == risposteDate[i]) {
/**/       numeroRisposteEsatte++;
/**/     }
/**/  }
/**/  return numeroRisposteEsatte;
}

// La funzione rinvia alla funzione "nuovoQuiz"
/**/ function gestoreClickInizia () {
   try {
      nuovoQuiz();
   } catch ( e ) {
      alert("gestoreClickInizia " + e);
   }
}

