import renderInnerPage from './pages/innerPage';
import renderLoginPage from './pages/loginPage';
import { signIn, signUp, signOut, resetPassword } from './auth';
import renderForgotPasswordPage from './pages/forgotPasswordPage';

document.querySelector('#root').addEventListener('click', (e) => {
  if (e.target.closest('#loginButton')) {
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    signIn(email, password).then((user) => {
      if (user) {
        console.log(user);
        renderInnerPage();
      } else {
        const errorMessage = document.createElement('p');
        errorMessage.innerHTML = 'Incorrect email or password';
        errorMessage.style.color = 'red';
        document.querySelector('.block-log-in').appendChild(errorMessage);
      }
    });
  }
  if (e.target.closest('.top-buttons .button-right')) {
    document.querySelector('.block-sign-up').classList.remove('js-hidden');
    document.querySelector('.block-log-in').classList.add('js-hidden');
    document.querySelector('.top-buttons .active').classList.add('js-left-50');
  }
  if (e.target.closest('.top-buttons .button-left')) {
    document.querySelector('.block-sign-up').classList.add('js-hidden');
    document.querySelector('.block-log-in').classList.remove('js-hidden');
    document.querySelector('.top-buttons .active').classList.remove('js-left-50');
  }
  if (e.target.closest('#signUpButton')) {
    const email = document.querySelector('#signUpEmail').value;
    const password = document.querySelector('#signUpPassword').value;
    const verifyPassword = document.querySelector('#verifySignUpPassword').value;
    const passwordRequirements = document.querySelector('#passwordRequirements');

    const isPasswordValid = (password) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };

    if (!isPasswordValid(password)) {
      passwordRequirements.innerHTML =
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)';
      passwordRequirements.style.color = 'red';
      return;
    }

    if (password === verifyPassword) {
      passwordRequirements.innerHTML = '';
      signUp(email, password).then((user) => {
        if (user) {
          console.log(user);
          renderInnerPage();
        } else {
          const errorMessage = document.createElement('p');
          errorMessage.innerHTML =
            'Email already exists. <a href="#" id="forgotPassword">Forgot Password?</a>';
          errorMessage.style.color = 'red';
          document.querySelector('.block-sign-up').appendChild(errorMessage);
          document.querySelector('#forgotPassword').addEventListener('click', () => {
            renderForgotPasswordPage();
          });
        }
      });
    } else {
      window.alert('Passwords do not match!');
    }
  }
  if (e.target.closest('#signOutButton')) {
    signOut().then(renderLoginPage);
  }
  if (e.target.closest('#forgotPassword')) {
    renderForgotPasswordPage();
  }
  if (e.target.closest('#backToLoginPage')) {
    renderLoginPage();
  }
  if (e.target.closest('#resetPasswordButton')) {
    const email = document.querySelector('#forgotPasswordEmail').value;
    resetPassword(email);
    renderLoginPage();
  }
});
