

const soloNumeros = (e) => {
    const soloNumero = /^[0-9,\ ]+$/;
    if(e.target.value === '' || soloNumero.test(e.target.value)) {
        return true;
    } 
    
    return false;

}

export default soloNumeros