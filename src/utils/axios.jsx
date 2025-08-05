import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTA0OWU4YjljNmNjMmM5MGNlMTRhM2E0YmViZmQ0NCIsIm5iZiI6MTc1MTExMDU5NS44NjgsInN1YiI6IjY4NWZkM2MzYWJkMmQyZmJlNDkxNTZmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eOpkDNliHeYVhYRRrPnNK_pwWJguvUxHQAzurXWflEA",
  },
});


export default instance;