const backendIPAddress = "127.0.0.1:3000";

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const createResume = async () => {
    await Save();
    show('resumePage','homePage')
}
const getProfileInformation = async () => {
  const options = {
    method: "PATCH",
    credentials: "include",
  };
  let res = await fetch(`http://${backendIPAddress}/user/updateUserData`,options);
  let data = await res.json();
  console.log(data);
  if (res.status == 200){
      show('homePage','loginPage');
      console.log("successfully logged in");
  }    
}
const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

getProfileInformation();
