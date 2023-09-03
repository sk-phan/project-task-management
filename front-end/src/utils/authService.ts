import api from "./api"

interface Credientials {
  email: string;
  password: string
}

const authService = {
  login(credientials: Credientials) {
    return api.post('/login', credientials);
  },
};

export default authService;
