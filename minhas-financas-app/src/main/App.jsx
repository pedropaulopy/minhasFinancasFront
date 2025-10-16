import Rotas from "./rotas";
import Navbar from "../components/navbar";
import React from 'react'
import Home from "../views/home";
import '../minhas-financas-template/html/Bootswatch_ Flatly_files/bootstrap.css'
import '../custom.css'
import {BrowserRouter} from "react-router";
class App extends React.Component {
      render(){
        return(
            <BrowserRouter>
                <Navbar/>
                <div className={"container"}>
                    <Rotas/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
