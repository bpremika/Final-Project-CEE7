const backendIPAddress = "34.235.250.54:3000";

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const createResume = async () => {
    await Save();
    await getData();
    show('resumePage','homePage')
}
const getProfileInformation = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  let res = await fetch(`http://${backendIPAddress}/user/getUserData`,options);
  let data = await res.json();
  console.log(data);
  if (res.status == 200){
      await FirstTimeDisplay();
      show('homePage','loginPage');
      console.log("successfully logged in");
  }    
}
const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

getProfileInformation();
