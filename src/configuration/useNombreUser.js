import { useState } from 'react';


export default function useUser() {
    const getUser = () => {
        const tipouserString = localStorage.getItem('tipouser');
        const tipouserToken = JSON.parse(tipouserString);
        return tipouserToken
      };
      const [tipoUser, setTipoUser] = useState(getUser());

      const saveUser = userTipoUser => {
        localStorage.setItem('tipouser', JSON.stringify(userTipoUser));
        setTipoUser(userTipoUser);
      };

      return {
        setTipoUser: saveUser,
        tipoUser
      }
}
