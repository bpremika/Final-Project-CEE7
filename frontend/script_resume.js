async function getData(){
    try{
        const options = {
            method: "GET",
            credentials: "include",
        };
        let response = await fetch("http://34.235.250.54:3000/user/getData",options);
        console.log(response);
        let data = await response.json();
        
        appendData(data);
    }catch(err){
        console.log(err);
    }
}

function appendData(data){
    var name = document.getElementById("name");
    var nickname = document.getElementById("nickname-resume");
    var h1 = document.createElement("div");
    var h3 = document.createElement("div");
    h1.textContent = `${data.firstname} ${data.lastname}`;
    h3.textContent = `( ${data.nickname} )`
    name.appendChild(h1)
    nickname.appendChild(h3)
    var contactPart = document.getElementById("contact");
    var pPhone =  document.createElement("p");
    pPhone.textContent = data.tel_no
    contactPart.appendChild(pPhone);
    var pMail =  document.createElement("p");
    pMail.textContent = data.email
    contactPart.appendChild(pMail);
    var pAdd =  document.createElement("p");
    pAdd.textContent = data.address
    contactPart.appendChild(pAdd);
    var contactPart2 = document.getElementById("link-work");
    var pGit =  document.createElement("a");
    pGit.href = data.github
    pGit.textContent = data.github
    contactPart2.appendChild(pGit);
    var pLinked =  document.createElement("a");
    pLinked.href = data.linkedin
    pLinked.textContent = data.linkedin
    contactPart2.appendChild(pLinked);

    var lang = document.getElementById("lang-skill")
    var plang =  document.createElement("span");
    plang.textContent = appendAllSkill(data.language_skill)
    lang.appendChild(plang)
    var framework = document.getElementById("framework-skill")
    var pframework =  document.createElement("span");
    pframework.textContent = appendAllSkill(data.framework_skill)
    framework.appendChild(pframework)
    var tools = document.getElementById("tools-skill")
    var ptools =  document.createElement("span");
    ptools.textContent = appendAllSkill(data.tools_skill)
    tools.appendChild(ptools)
    var other = document.getElementById("other-skill")
    var pother =  document.createElement("span");
    pother.textContent = appendAllSkill(data.other_skill)
    other.appendChild(pother)
    var educationPart = document.getElementById('education');
    educationPart.innerHTML = data.education.map((edu) => {
        let span2;
        if(edu.graduation_year < new Date().getFullYear()){
            span2 = ` ${edu.university_name}, ${edu.start_year}-${edu.graduation_year} `
        } else {
            span2 = ` ${edu.university_name}, ${edu.start_year}- Present`;
            let div = `<div>Expected graduation date ${edu.graduation_year}</div>`
            return `<li><span id="head-education">${edu.degree} ${edu.field_of_study}</span>${span2}${div}</li>`;
        }
        return `<li><span id="head-education">${edu.degree} ${edu.field_of_study}</span>${span2}</li>`;
    }).join('');
    var ProjectPart = document.getElementById("projects");
    ProjectPart.innerHTML = data.projects.map((project) => {
        return `
            <span>
                <div>${project.title} </div>
                <div>${project.year}</div>
            </span>
            <li>${project.detail}</li>
            <a href="${project.link}">${project.link}</a>
        `;
    }).join('');
    var WorkPart = document.getElementById("work_experience");
    WorkPart.innerHTML = data.work_experience.map((work) => {
        return `
            <span>
                <div id="work_type">${work.employment_type}</div>
                <div id="work_title">${work.company_name}</div>
                <div id="work_year">${work.start_year}-${work.end_year}</div>
            </span>
            <div>${work.title}</div>
            <li>${work.description}</li>
        `;
    }).join('');

}
function appendAllSkill(Skill) {
    var listSkill = []
    for (let i = 0 ;i <Skill.length;i++){
        listSkill.push(Skill[i].name)
    }
    return listSkill
}
