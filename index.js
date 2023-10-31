function maskaPass(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}
const deletePass = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`Successfully Deleted ${website}'s Password`);
  showPass();
};
function copyText(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      document.querySelector(".alert").classList.remove("alert");
      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 2000);
    },
    () => {
      alert("Could Not Copy Text");
    }
  );
}

const showPass = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "No Data Available to Show...!";
  } else {
    tb.innerHTML = `
    <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th style="border-right:none">Delete</th>
  </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      str += `<tr>
      <td>${element.website}<img onclick="copyText('${
        element.website
      }')" src="copy.png" alt="Copy Text"></td>
      <td>${element.username}<img onclick="copyText('${
        element.username
      }')" src="copy.png" alt="Copy Text"></td>
      <td>${maskaPass(element.password)}<img onclick="copyText('${
        element.password
      }')" src="copy.png" alt="Copy Text"></td>
      <td style="border-right:none"><button class="btndel" onclick="deletePass('${
        element.website
      }')">Delete</button></td>
    </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};
showPass();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked...!");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert(" Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert(" Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPass();
});
