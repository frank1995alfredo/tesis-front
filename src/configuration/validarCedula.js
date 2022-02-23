

const validarCedula = (cad) => {

    //var cad = "2100373873";
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;
    var i = 0;

    if (cad !== "" && longitud === 10){
      for(i = 0; i < longcheck; i++){
        if (i%2 === 0) {
          var aux = cad.charAt(i) * 2;
          if (aux > 9) aux -= 9;
          total += aux;
        } else {
          total += parseInt(cad.charAt(i)); // parseInt concatenará en lugar de sumar
        }
      }

      total = total % 10 ? 10 - total % 10 : 0;

      if (cad.charAt(longitud-1) == total) {
        console.log("cedula valida");
      }else{
        console.log("cedula invalida"); 
      }
    }


}

export default validarCedula