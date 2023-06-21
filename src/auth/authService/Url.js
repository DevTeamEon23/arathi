export default function Url() {
  let liveUrl;
  if (
    // put your domain
    // window.location.hostname === 'https://eonlearning.com/'
    window.location.hostname === "http://localhost:3000/" 
  ) {
    // liveUrl = "https://v1.eonlearning.tech/";
    liveUrl = "http://localhost:8000/";
  } else {
    // Hear put your local address for local devlopment
    liveUrl = "http://localhost:8000/";
  }
  return liveUrl;
}
