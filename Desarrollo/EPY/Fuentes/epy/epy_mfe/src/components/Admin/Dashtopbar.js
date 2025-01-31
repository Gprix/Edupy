import React, { Component } from "react";

export class Dashtopbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars" />
        </button>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block" />
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{`${this.props.usuario.first_name} ${this.props.usuario.last_name}`}</span>
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                (@{this.props.usuario.username})
              </span>
              <i className="fas fa-user fa-2x text-gray-300" />
            </a>
            {/* Dropdown - User Information */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              {/* <a className="dropdown-item" href="/">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                Profile
                            </a> */}
              {/* <a className="dropdown-item" href="/">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                Settings
                            </a> */}

              {/* <div className="dropdown-divider" /> */}
              <a
                className="dropdown-item"
                href="/api-auth/logout/?next=/"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Cerrar sesión
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Dashtopbar;
