import "../styles/Navbar.scss";
import logo from "../assets/recycling-recycle-svgrepo-com.svg" 

function Navbar() {
    const onLoginHref = () => {
        console.log('I register');
    };
    return (
        <>
            <nav>
                <a href="/home">
                    <img src = {logo}/>
                </a>
                <div>
                    <ul id="navbar">
                        <li>
                            <a href="/account">My Account</a>
                        </li>
                       
                            <li>
                                <a href="/login" onClick={onLoginHref}>Login</a>
                            </li>
                        
                        <li>
                            <a href="/home">About</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;