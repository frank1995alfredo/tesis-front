

const soloLetras = (e) => {
    const soloLetra = /^[A-Za-z\ áéíóúÁÉÍÓÚñÑ]+$/;
    if(e.target.value === '' || soloLetra.test(e.target.value)) {
        return true;
    } 
    
    return false;

}

export default soloLetras