import api from "./api"

interface Credientials {
  email: string;
  password: string
}

const authService = {
  login(credientials: Credientials) {
    return api.post('/login', credientials);
  },
  signUp(credientials: Credientials) {
    return api.post('/user', credientials)
  }
};

export default authService;
