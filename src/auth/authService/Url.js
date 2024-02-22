export default function Url() {
  let liveUrl;
  if (
    // put your domain
    // window.location.hostname ===
    // "https://frontend-ani.deajn483gzo3k.amplifyapp.com/login"
    window.location.hostname === "http://localhost:3000/"
  ) {
    // liveUrl = "http://127.0.0.1:8081/";
    liveUrl = "http://127.0.0.1:8000/";
  } else {
    // Hear put your local address for local devlopment
    liveUrl = "http://127.0.0.1:8000/";
    // liveUrl = "http://127.0.0.1:8081/";
  }
  return liveUrl;
}
