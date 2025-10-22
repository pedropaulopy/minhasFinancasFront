import Rotas from "./rotas";
import Navbar from "../components/navbar";
import {AuthProvider} from "../app/services/provedorAutenticacao";
import React from 'react'

import 'toastr/build/toastr.min.css'
import 'primereact/resources/themes/nova/theme.css'
import 'primereact/resources/primereact.min.css'
// import 'toastr/build/toastr.css'
import '../minhas-financas-template/html/Bootswatch_ Flatly_files/bootstrap.css'
import '../custom.css'
import 'primeicons/primeicons.css';


import {BrowserRouter} from "react-router";
class App extends React.Component {
      render(){
        return(
            <AuthProvider>
                <BrowserRouter>
                    <Navbar/>
                    <div className={"container"}>
                        <Rotas/>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        )
    }
}

export default App;
