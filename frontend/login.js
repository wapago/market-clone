const form = document.querySelector("#login-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });

  if (res.status === 401) {
    alert("로그인에 실패하였습니다");
    return;
  }

  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken);

  alert("로그인되었습니다!!");

  window.location.pathname = "/";
};

form.addEventListener("submit", handleSubmitForm);
