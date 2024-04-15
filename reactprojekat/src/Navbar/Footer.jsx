 
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer"> 
        <div className="footer_inner">
          <div className="c-footer">
            <div className="layout">
              <div className="layout_item w-50">
                <div className="newsletter">
                  <h3 className="newsletter_title">Get updates on fun stuff you probably want to know about in your inbox.</h3>
                  <form action="">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              <div className="layout_item w-25">
                <nav className="c-nav-tool">
                  <h4 className="c-nav-tool_title">Menu</h4>
                  <ul className="c-nav-tool_list">
                    <li className="c-nav-tool_item">
                      <a href="/ponuda" className="c-link">Ponuda</a>
                    </li>
                
                    <li className="c-nav-tool_item">
                      <a href="/register" className="c-link">Register</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/login" className="c-link">Login</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="layout_item w-25">
                <nav className="c-nav-tool">
                  <h4 className="c-nav-tool_title">Support</h4>
                  <ul className="c-nav-tool_list">
                    <li className="c-nav-tool_item">
                      <a href="/ponuda" className="c-link">Ponuda</a>
                    </li>
                
                    <li className="c-nav-tool_item">
                      <a href="/register" className="c-link">Register</a>
                    </li>
                    <li className="c-nav-tool_item">
                      <a href="/login" className="c-link">Login</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
           
          </div>
          
        </div>
      </footer>
   
  );
}

export default Footer;
