import React from "react";
import "../css/bootstrap.min.css";
import "../css/aboutus.css";
import "../css/cart.css";
import "../css/common-styles.css";
import "../css/contactus.css";
import "../css/faq.css";
import "../css/font-awesome.css";
import "../css/fonts.css";
import "../css/footer.css";
import "../css/home.css";
import logo from "../assets/images/logo.svg";
import homesearch from "../assets/images/homesearch.png";
import user from "../assets/images/user.svg";
import badgepercent from "../assets/images/badgepercent.svg";
import shoppingcarth from "../assets/images/shoppingcarth.svg";
import lifering from "../assets/images/lifering.svg";



export default function Header() {
  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <div class="alert blue-wrapper alert-dismissible fade show">
  <strong>Cureka:</strong> <span style={{color:"orange"}}>India's</span> leading Online Healthcare Platform.
  <button type="button" class="btn-close" data-bs-dismiss="alert">
  </button>
</div>
<div class="alert offers-wrapper .explore alert-dismissible fade show">
  <b>Limited Period Offer:</b>Get 10% off + extra 8% off on Nutrition Products & more offers.<a href="#"><span>Explore</span></a>
  <button type="button" class="btn-close" data-bs-dismiss="alert">
  </button>
</div>
     <div class="container-fluid">

<div class="border-bottom">

  <div class="container px-0" id="header">

    <nav class="navbar navbar-expand-lg navbar-light bg-white pb-3 px-0">

      <div class="mobilelogo">

        <button class="navbar-toggler" type="button" data-target="#mySidenav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onclick="openNav()">

          <span class="navbar-toggler-icon"></span>

        </button>

        <a class="navbar-brand" href="index"><img class="img-fluid" src={logo} width="112px" height="47px" alt="cureka-logo" /></a>

      </div>
     
      <li class="nav-item d-lg-block d-none">

                  <div class="form-group">

                    <div class="d-flex search">

                      <input type="search" class="form-control border-0" placeholder="Search For “Skin Care”" aria-label="search" name="search" aria-describedby="search" />

                      <img class="img-fluid search-icon" src={homesearch} width="16px" height="16px" alt="search" />

                    </div>

                  </div>
                 
      </li>

      
      <div className="cart-icon">
      <div className="text-links d-lg-flex d-flex-column">
      <li className="nav-item">

<a className="nav-link" href="offers"><img className="img-fluid mr-2 d-lg-block d-none" src={badgepercent} width="20px" height="20px" alt="badge" />Offers</a>

</li>
    
    <li className="nav-item">

      <a className="nav-link" data-toggle="modal" href="#loginModal" data-target="#loginModal"><img className="img-fluid mr-2" src={user} width="20px" height="20px" alt="badge" />Hello,Login</a>
     </li>

    <li class="nav-item">

      <a class="nav-link" href="cart"><img class="img-fluid mr-2" src={shoppingcarth} width="20px" height="20px" alt="user" />Cart</a>
     
    </li>

    <li class="nav-item">

      <a class="nav-link" href="#"><img class="img-fluid mr-2 d-lg-block d-none" src={lifering} width="20px" height="20px" alt="user" />Help Desk</a>

    </li>


    
</div>
</div>

    </nav>

  </div>
    
</div>
     
    </div>
      
    </>
  );
}
