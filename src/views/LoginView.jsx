import React from 'react';
import axios from 'axios';
import "../styles/LoginView.scss";
import "../index.scss";
import superhero from "../assets/img/eco-man.svg";
import LocalStorage from '../helpers/LocalStorage';
import RedirectionHelper from '../helpers/RedirectionHelper';
import ApiHelper from '../helpers/ApiHelper';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      csrfToken: null,
    };
  }

  componentDidMount() {
    this.retrieveCsrfToken();
  }

  retrieveCsrfToken = async () => {
    try {
      const csrfToken = await ApiHelper.fetchCsrfToken();
      this.setState({ csrfToken });
    } catch (error) {
      console.error('Error retrieving CSRF token:', error);
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, csrfToken } = this.state;

    try {
      await axios.post('/api/login', {
        email: email,
        password: password,
      }, {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
        }
      });

      console.log('Login successful');

      const userDetails = await ApiHelper.fetchLoggedUser();
      LocalStorage.SetActiveUser(userDetails.uuid);
      RedirectionHelper.Redirect("hub");
    } catch (error) {
      console.error('Error during login or fetching user data:', error);
    }
  }

  render() {
    if (LocalStorage.IsUserLogged()) {
      RedirectionHelper.Redirect("hub")
    }

    return (
      <div className="LoginSite">
        <div>
          <img className="superHero" src={superhero} />
        </div>
        <div className="LoginMain">
          <h2>We need our superhero!</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="LoginMail">
              <label>Email
                <input
                  type="text"
                  name="email"
                  autoComplete="on"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>

            <div className="LoginPass">
              <label>Password
                <input
                  type="password"
                  name="password"
                  autoComplete="on"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <button className="button1" type="submit">Sign in</button>
          </form>

          <div className="ForgotPassHref">
            <a href="/" >Forgot Password?</a>
          </div>

          <div className="RegisterHref">
            <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginView;
