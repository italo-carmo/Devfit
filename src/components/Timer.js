import React, {useState} from "react";
// TouchableOpacity - usado para criar um botão
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default () => {
  const [numero, setNumero] = useState('00:00:00');
  const [botao, setBotao] = useState("INICIAR");
  const [ultimo, setUltimo] = useState(null);
  
  function vai(){
    if(timer !== null){
      // Aqui vai parar o timer
      clearInterval(timer);
      timer = null;

      setBotao("INICIAR")
    } else {
      // Começar a girar o timer... 
      timer = setInterval(()=>{
        ss++;

        if(ss==60){
          ss = 0;
          mm++;
        } else if(mm == 60){
          mm = 0;
          hh++;
        }

        let format = 
        (hh < 10 ? "0" + hh : hh) + ":" 
        + (mm < 10 ? "0" + mm : mm) + ":"
        + (ss < 10 ? "0" + ss : ss);

        setNumero(format);

        // 1000 milissegundos - igual a 1 segundo 
      }, 1000);

      setBotao("PARAR");
    }
  }

  function limpar(){
    if (timer !== null){
      // Parar o timer
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);
    setNumero('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao("INICIAR");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{numero}</Text>
      <View style={styles.btnArea}>
        {/* onPress - tem a mesma função do onClick */}
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}> LIMPAR </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1 - para pegar a altura total da tela
    alignItems: "center",
    justifyContent: "center",
    marginBottom:30
  },
  timer:{
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  btnArea:{
    flexDirection: "row",
    marginTop: 10,
    height: 40,
  },
  btn:{
    // flex: 1 - para pegar a altura total da view
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#3ba237",
  },
  areaUltima:{
    marginTop: 40,
  },
  textoCorrida:{
    fontSize: 23,
    color: "#FFF",
    fontStyle: "italic"
  }
})