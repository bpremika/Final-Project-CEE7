fetch("info1.json")
    .then(response => response.json())
    .then(data => appendData(data))
    .catch(err => console.log("errror" + err))
function appendData(data){
    var name = document.getElementById("name");
    var nickname = document.getElementById("nickname");
    var h1 = document.createElement("h1");
    var h3 = document.createElement("h3");
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
    for(let i = 0; i < data.education.length;i++){
        var li = document.createElement("li")
        var span1 = document.createElement("span")
        var span2 = document.createElement("span")
        span1.id = "head-education"
        span1.textContent = data.education[i].degree + " " + data.education[i].field_of_study
        li.append(span1)
        if(data.education[i].graduation_year < new Date().getFullYear()){
            span2.textContent =` ${data.education[i].university_name}, ${data.education[i].start_year}-${data.education[i].graduation_year} `
            li.append(span2)
        }else{
            span2.textContent = ` ${data.education[i].university_name}, ${data.education[i].start_year}- Present`
            let div = document.createElement("div")
            div.textContent = `Expected graduation date ${data.education[i].graduation_year}`
            li.append(span2)
            li.append(div)
        } 
        educationPart.appendChild(li)
    }
    var ProjectPart = document.getElementById("projects");
    for(let i = 0;i < data.projects.length;i++){
        var nameProject = document.createElement("div");
        var year = document.createElement("div");
        var span = document.createElement("span");
        var detail = document.createElement("li");
        var link = document.createElement("a");
        nameProject.textContent = data.projects[i].title
        year.textContent = data.projects[i].year
        detail.textContent = data.projects[i].detail
        link.textContent = data.projects[i].link
        link.href = data.projects[i].link
        span.appendChild(nameProject);
        span.appendChild(year);
        ProjectPart.appendChild(span);
        ProjectPart.appendChild(detail);
        ProjectPart.appendChild(link);
    }
    var WorkPart = document.getElementById("work_experience");
    for(let i = 0;i < data.work_experience.length;i++){
        var title = document.createElement("div");
        var type = document.createElement("div");
        var company = document.createElement("div");
        var span = document.createElement("span");
        var detail = document.createElement("li");
        var year = document.createElement("div");
        title.id = "work_title"
        title.textContent = data.work_experience[i].title
        type.textContent = data.work_experience[i].employment_type
        detail.textContent = data.work_experience[i].description        
        company.textContent = data.work_experience[i].company_name
        year.textContent = `${data.work_experience[i].start_year}-${data.work_experience[i].end_year}`
        span.appendChild(type);
        span.appendChild(title);
        span.appendChild(year)
        WorkPart.appendChild(span);
        WorkPart.appendChild(company);
        WorkPart.appendChild(detail);
    }

}
function appendAllSkill(Skill) {
    var listSkill = []
    for (let i = 0 ;i <Skill.length;i++){
        listSkill.push(Skill[i].name)
    }
    return listSkill
}