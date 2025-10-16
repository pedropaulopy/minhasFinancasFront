import React from "react";

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";

import { Route, Switch} from "react-router-dom";

function Rotas(){
        return(
            <Switch>
                <Route path={"/login"} component={Login} />
                <Route path={"/cadastro-usuarios"} component={CadastroUsuario} />
            </Switch>
        )
}

export default Rotas