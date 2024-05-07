const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const password1 = formData.get("password");
  const password2 = formData.get("password2");

  console.log(password1);
  console.log(password2);

  if (password1 == password2) return true;
  else return false;
};

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  //   const sha256Password2 = sha256(formData.get("password2"));

  formData.set("password", sha256Password);
  //   formData.set("password2", sha256Password2);

  const div = document.querySelector("#info");

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data == "200") {
      //   div.innerText = "회원가입에 성공했습니다!";
      //   div.style.color = "blue";
      alert("회원 가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 같지 않습니다.";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmitForm);
