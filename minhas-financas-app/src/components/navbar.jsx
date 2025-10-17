import React from "react";
import { Link } from "react-router"; // 1. Import Link

function Navbar(){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                {/* This is an EXTERNAL link, so it's OK to keep as <a> */}
                <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        {/* 2. Change <a> to <Link> and href to "to" */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cadastro-usuarios">Usuários</Link>
                        </li>
                        <li className="nav-item">
                            {/* This one also pointed to "/", changed it */}
                            <Link className="nav-link" to="/">Lançamentos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;