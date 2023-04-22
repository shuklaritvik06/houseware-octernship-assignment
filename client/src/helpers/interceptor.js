export default function genRefresh() {
  fetch("http://localhost:5000/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  })
    .then((res) => res.json())
    .then((data) => {
      var now = new Date();
      var refresh = new Date();
      refresh.setTime(refresh.getTime() + 24 * 3600 * 1000);
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      document.cookie = `access_token=${
        data.access_token
      };expires=${now.toUTCString()};path=/`;
      document.cookie = `refresh_token=${
        data.refresh_token
      };expires=${refresh.toUTCString()};path=/`;
    });
}
