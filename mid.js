// JSON TEST ,just like if we receive the detail of user from backend
let user = {
  student_id: "",
  firstname: "",
  lastname: "",
  nickname: "",
  address: "",
  tel_no: "",
  email: "",
  github: "",
  linkedin: "",
  education: [
    {
      degree: "",
      university_name: "",
      field_of_study: "",
      start_year: "",
      graduation_year: "",
    },
  ],
  language_skill: [
    {
      id: "",
      name: "",
    },
  ],
  framework_skill: [
    {
      id: "",
      name: "",
    },
  ],
  tools_skill: [
    {
      id: "",
      name: "",
    },
  ],
  other_skill: [
    {
      id: "",
      name: "",
    },
  ],
  work_experience: [
    /*{
      title: "",
      employment_type: "",
      company_name: "",
      start_year: "",
      end_year: "",
      description: "",
    },*/
  ],
  projects: [
    /*{
      title: "",
      year: "",
      link: "",
      detail: "",
    },*/
  ],
};
/*                START of Contact Information                     */
const contact_submit = document.getElementById("contact-submit");

contact_submit.addEventListener("click", () => {
  Save_Contact();
});

/*                      START OF SKILLS PORTION                      */

const lang_input = document.querySelector(".tag-lang-container input");
const framework_input = document.querySelector(
  ".tag-framework-container input"
);
const tools_input = document.querySelector(".tag-tools-container input");
const others_input = document.querySelector(".tag-others-container input");

var tags = [];
let object = {
  lang: {
    tags: [],
    container: document.querySelector(".tag-lang-container"),
  },
  framework: {
    tags: [],
    container: document.querySelector(".tag-framework-container"),
  },
  tools: {
    tags: [],
    container: document.querySelector(".tag-tools-container"),
  },
  others: {
    tags: [],
    container: document.querySelector(".tag-others-container"),
  },
};

function createTag(label, type) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  div.setAttribute("type", type);

  div.innerHTML = label;

  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "fa fa-close");
  closeBtn.setAttribute("data-item", label);
  closeBtn.setAttribute("type", type);
  div.appendChild(closeBtn);
  return div;
}

function reset(type) {
  document.querySelectorAll(".tag").forEach(function (tag) {
    if (tag.getAttribute("type") === type) tag.parentElement.removeChild(tag);
  });
}

function addTags(type) {
  reset(type);
  object[type].tags
    .slice()
    .reverse()
    .forEach((tag) => {
      const input = createTag(tag, type);
      object[type].container.prepend(input);
    });
}

lang_input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    let tagname = lang_input.value;
    if (!object.lang.tags.includes(tagname)) {
      object["lang"].tags.push(lang_input.value);
      addTags("lang");
      Save_Skills();
    }
    lang_input.value = "";
  }
});

framework_input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    let tagname = framework_input.value;
    if (!object.framework.tags.includes(tagname)) {
      object["framework"].tags.push(framework_input.value);
      addTags("framework");
      Save_Skills();
    }
    framework_input.value = "";
  }
});

others_input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    let tagname = others_input.value;
    if (!object.others.tags.includes(tagname)) {
      object["others"].tags.push(others_input.value);
      addTags("others");
      Save_Skills();
    }
    others_input.value = "";
  }
});

tools_input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    let tagname = tools_input.value;
    if (!object.tools.tags.includes(tagname)) {
      object["tools"].tags.push(tools_input.value);
      addTags("tools");
      Save_Skills();
    }
    tools_input.value = "";
  }
});

// Delete
document.addEventListener("click", function (e) {
  type = e.target.getAttribute("type");
  if (type != null) {
    if (e.target.tagName === "I") {
      const value = e.target.getAttribute("data-item");
      const index = object[type].tags.indexOf(value);
      object[type].tags = [
        ...object[type].tags.slice(0, index),
        ...object[type].tags.slice(index + 1),
      ];
      addTags(type);
      Save_Skills();
    }
  }
});
/*                  END OF SKILLS PORTION                      */

/*                 START OF             EDUCATION PORTION                              */

const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create");

let todos = [];
create_btn_el.addEventListener("click", CreateNewTodo);

let educations = [];

function CreateNewTodo() {
  const record = {
    id: new Date().getTime(),
    detail: {
      degree: "",
      university_name: "",
      field_of_study: "",
      start_year: "",
      graduation_year: "",
    },
    edit: true,
  };

  educations.push(record);

  const item_el = CreateTodoElement(record);

  list_el.append(item_el);

  Save_Educations();
}
function CreateTodoElement(record) {
  if (record.edit) {
    const item_el = document.createElement("div");
    item_el.classList.add("inputbox");
    // UPPER PORTION
    const upper = document.createElement("div");
    upper.classList.add("upper");
    var mySelect = document.createElement("select");
    mySelect.id = "degree";
    var options = ["Bachelor", "Master", "Doctoral"];
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement("option");
      option.value = options[i];
      option.text = options[i];
      mySelect.appendChild(option);
    }
    const university_name = document.createElement("input");
    university_name.placeholder = "Your School";
    university_name.id = "university_name";

    mySelect.value = record.detail.degree;
    university_name.value = record.detail.university_name;

    upper.appendChild(mySelect);
    upper.appendChild(university_name);

    // MIDDLE PORTION
    const middle = document.createElement("div");
    middle.classList.add("middle");
    const field_of_study = document.createElement("input");
    field_of_study.placeholder = "Field of study";
    field_of_study.id = "field_of_study";

    field_of_study.value = record.detail.field_of_study;

    middle.appendChild(field_of_study);

    // BOTTOM PORTION
    const bottom = document.createElement("div");
    bottom.classList.add("bottom");
    const start_year = document.createElement("input");
    start_year.placeholder = "Start year";
    start_year.id = "start_year";
    const graduation_year = document.createElement("input");
    graduation_year.placeholder = "Graduation year";
    graduation_year.id = "graduation_year";

    start_year.value = record.detail.start_year;
    graduation_year.value = record.detail.graduation_year;

    bottom.appendChild(start_year);
    bottom.appendChild(graduation_year);

    // BUTTON PART
    const button = document.createElement("div");
    const Submit = document.createElement("button");
    Submit.id = "Submit";
    Submit.innerHTML = "Submit";
    const Delete = document.createElement("button");
    Delete.id = "Delete";
    Delete.innerHTML = "Delete";

    button.appendChild(Submit);
    button.appendChild(Delete);

    item_el.appendChild(upper);
    item_el.appendChild(middle);
    item_el.appendChild(bottom);
    item_el.appendChild(button);

    //EVENTS
    Delete.addEventListener("click", () => {
      educations = educations.filter((t) => t.id != record.id);

      item_el.remove();

      Save_Educations();
    });

    Submit.addEventListener("click", () => {
      record.detail.degree = mySelect.value;
      record.detail.university_name = university_name.value;
      record.detail.field_of_study = field_of_study.value;
      record.detail.start_year = start_year.value;
      record.detail.graduation_year = graduation_year.value;
      record.edit = false;
      Save_Educations();
      list_el.innerHTML = "";
      DisplayTodos();
    });
    // console.log(item_el);
    return item_el;
  } else {
    const item_el = document.createElement("div");
    item_el.classList.add("show");

    // UPPER PORTION
    const show_upper = document.createElement("div");
    show_upper.id = "show-upper";

    const upper_header = document.createElement("div");
    upper_header.id = "upper-header";
    upper_header.innerHTML =
      record.detail.degree + " of " + record.detail.field_of_study;

    const upper_right = document.createElement("div");
    upper_right.id = "upper-right";

    const upper_period = document.createElement("div");
    upper_period.id = "upper-period";
    upper_period.innerHTML =
      record.detail.start_year + "-" + record.detail.graduation_year;

    const edit_button = document.createElement("button");
    edit_button.id = "edit-button";
    const icon = document.createElement("i");

    icon.setAttribute("class", "fa fa-edit");
    edit_button.appendChild(icon);

    upper_right.appendChild(upper_period);
    upper_right.appendChild(edit_button);

    show_upper.appendChild(upper_header);
    show_upper.appendChild(upper_right);

    // LOWER PORTION
    const show_lower = document.createElement("div");
    show_lower.id = "show-lower";
    show_lower.innerHTML = record.detail.university_name;

    item_el.appendChild(show_upper);
    item_el.appendChild(show_lower);
    // console.log(item_el);

    edit_button.addEventListener("click", () => {
      let childs = list_el.querySelectorAll("div.show, div.inputbox");

      let index;
      for (let i = 0; i < childs.length; i++) {
        if (childs[i] === item_el) {
          index = i;
          console.log(index);
        }
      }
      educations[index].edit = true;
      list_el.innerHTML = "";
      DisplayTodos();
      Save_Educations();
    });

    return item_el;
  }
}

function DisplayTodos() {
  for (let i = 0; i < educations.length; i++) {
    const records = educations[i];

    const item_el = CreateTodoElement(records);
    list_el.append(item_el);
  }
  // document.getElementById("fullname").value = user.firstname;
  // document.getElementById("lastname").value = user.lastname;
  // document.getElementById("nickname").value = user.nickname;
  // document.getElementById("address").value = user.address;
  // document.getElementById("tel").value = user.tel_no;
  // document.getElementById("email").value = user.email;
  // document.getElementById("github").value = user.github;
  // document.getElementById("linkedin").value = user.linkedin;
  // addTags("lang");
  // addTags("tools");
  // addTags("others");
  // addTags("framework");
}

function FirstTimeDisplay() {
  Load();

  for (let i = 0; i < educations.length; i++) {
    const records = educations[i];

    const item_el = CreateTodoElement(records);
    list_el.append(item_el);
  }
  document.getElementById("fullname").value = user.firstname;
  document.getElementById("lastname").value = user.lastname;
  document.getElementById("nickname").value = user.nickname;
  document.getElementById("address").value = user.address;
  document.getElementById("tel").value = user.tel_no;
  document.getElementById("email").value = user.email;
  document.getElementById("github").value = user.github;
  document.getElementById("linkedin").value = user.linkedin;
  addTags("lang");
  addTags("tools");
  addTags("others");
  addTags("framework");
}
FirstTimeDisplay();

function Save() {
  /*  Change this code instead of local storage to database ...*/
  const user_info = JSON.stringify(user);
  localStorage.setItem("user_info", user_info);
}
function Save_Educations() {
  user.education = educations.map((record) => record.detail);
  Save();
}
function Save_Skills() {
  user.language_skill = object.lang.tags.map((tag) => ({
    name: tag,
    id: Math.floor(Math.random() * Date.now()).toString(16),
  }));
  user.framework_skill = object.framework.tags.map((tag) => ({
    name: tag,
    id: Math.floor(Math.random() * Date.now()).toString(16),
  }));
  user.tools_skill = object.tools.tags.map((tag) => ({
    name: tag,
    id: Math.floor(Math.random() * Date.now()).toString(16),
  }));
  user.other_skill = object.others.tags.map((tag) => ({
    name: tag,
    id: Math.floor(Math.random() * Date.now()).toString(16),
  }));
  Save();
}

function Save_Contact() {
  user.firstname = document.getElementById("fullname").value;
  user.lastname = document.getElementById("lastname").value;
  user.nickname = document.getElementById("nickname").value;
  user.address = document.getElementById("address").value;
  user.tel_no = document.getElementById("tel").value;
  user.email = document.getElementById("email").value;
  user.github = document.getElementById("github").value;
  user.linkedin = document.getElementById("linkedin").value;
  Save();
}

function Load() {
  const data1 = localStorage.getItem("user_info");
  if (data1) {
    user = JSON.parse(data1);
    educations = user.education.map((detail) => createRecord(detail));
    object.lang.tags = user.language_skill.map(({ name, id }) => name);
    object.framework.tags = user.framework_skill.map(({ name, id }) => name);
    object.tools.tags = user.tools_skill.map(({ name, id }) => name);
    object.others.tags = user.other_skill.map(({ name, id }) => name);
  }
}

function createRecord(detail) {
  const record = {
    id: Math.floor(Math.random() * Date.now()).toString(16),
    detail: detail,
    edit: false,
  };
  return record;
}
/*                 END OF            EDUCATION PORTION                              */
function clear(){
  localStorage.removeItem("user_info");
}
//clear();
//--------------------------------------------------------------
function addElement(html_string, parent_id, index) {
  const parent = document.getElementById(parent_id);

  const div = document.createElement("div");
  div.innerHTML = html_string;
  if (index >= parent.childElementCount || index == -1) {
    index = parent.children.length;
  }
  const refElement = parent.children[index];
  parent.insertBefore(div.firstChild, refElement);
}
function addbefore(html_string, parent_id, prev_element) {
  const parent = document.getElementById(parent_id);
  const div = document.createElement("div");
  div.innerHTML = html_string;
  parent.insertBefore(div.firstChild, prev_element);
}
function clearinput(parent_element_id) {
  const parent = document.getElementById(parent_element_id);
  const inputElements = parent.getElementsByTagName("input");

  for (let i = 0; i < inputElements.length; i++) {
    const input = inputElements[i];
    if (input.type === "text") {
      input.value = "";
    }
  }
}
function getAllInputText(parent_id) {
  const parent = document.getElementById(parent_id);
  const inputElements = parent.getElementsByTagName("input");

  const inputTextArray = [];
  for (let i = 0; i < inputElements.length; i++) {
    const input = inputElements[i];
    if (input.type === "text") {
      inputTextArray.push(input.value);
    }
  }

  return inputTextArray;
}
function getTextInDivs(container) {
  let divs = container.querySelectorAll('div');
  let textList = [];
  divs.forEach(div => {
    let text = div.textContent.trim();
    if (text !== '') {
      textList.push(text);
    }
  });
  return textList;
}

function delete_element(id) {
  var elementToRemove = document.getElementById(id);
  var parent = elementToRemove.parentNode;
  parent.removeChild(elementToRemove);
}
function delete_parent() {
  var parent = event.target.parentNode;
  parent.remove();
}

//-----------Project-------------
const projectlist = document.getElementById("existing_project_list");
var p_count = 0;
function p_load(list) {
  for (let i = 0; i < list.length; i++) {
    p_count += 1;
    var info = [list[i].title,list[i].year,list[i].link,list[i].detail];
    html_string = p_new(info, "project_" + p_count);
    addElement(html_string, "existing_project_list", -1);
  }
}
p_load(user.projects);

function p_save(info) {
  user.projects=[];
  p_list=document.getElementById("existing_project_list");
  for (let i = 0; i < p_list.childNodes.length; i++) {
   p = p_list.children[i];
    info=[];
    //testinput=exp.querySelector('input');
    if(p){if(p.querySelector('input')){
      info=getAllInputText(p.id);
    }
    else if(!p.classList.contains('testt')){
      info=p_datafix(getTextInDivs(p));
    }
    else{continue;}}
    else{
      continue;
    }
    user.projects.push({
      
        title: info[0],
        year: info[1],
        link: info[2],
        detail: info[3],
      
    });
    console.log(info);
  }
  Save();
  console.log("save done" +user.projects);
}
function p_new(info, id) {
  var info1 = info[0] + "  ( " + info[1] + " )";
  //var info2 = info[3].substring(0, 50) + "..."; //cut short detail
  return (
    '<div class="existing_project" id="' +
    id +
    '"><div class="p_info1">' +
    info1 + 
    '</div><div class="p_info2">' +
    info[2] +
    "</div>" +
    '<div class="p_info2">' +
    info[3] +
    "</div>"+
    '<i class="fa fa-edit editbutton" onclick=p_edit_button(this)></i></div>'
  );
  //<button class="edit_button" onclick=p_edit_button(this)>Edit</button>
}
function p_add_button() {
  p_count += 1;
  var info = getAllInputText("new_project_box");
  html_string = p_new(info, "project_" + p_count);
  addElement(html_string, "existing_project_list", -1);
  clearinput("new_project_box");
  //SAVEDATA
  p_save(info);
}
function p_new_editbox(info, id) {
  return (
    '<div class="p_edit_box" id="' +
    id +
    '">' +
    '<div class="in_line" id="new_project_l1">' +
    '<input type="text" id="p_title" placeholder="Title" class="in_box p_title" value="' +
    info[0] +
    '"/>' +
    '<input type="text" id="p_year" placeholder="Year" class="in_box p_year"value="' +
    info[1] +
    '"/></div>' +
    '<div class="in_line" id="new_project_l2">' +
    '<input type="text" id="p_link" placeholder="Link" class="in_box p_link"value="' +
    info[2] +
    '"/></div>' +
    ' <div class="in_line" id="new_project_l3">' +
    '<input type="text" id="p_detail" placeholder="Detail..." class="in_box p_detail"value="' +
    info[3] +
    '"/></div>' +
    '<button id="done" onclick=p_edit_done(this)>Save</button>' +
    '<button id="delete" onclick=delete_parent(event);p_save();>Delete</button></div>'
  );
}
function p_edit_button(editbutton) {
  
  info = p_datafix(getTextInDivs(editbutton.parentNode)); //test
  html_string = p_new_editbox(info, editbutton.parentNode.id);
  //var index=Array.prototype.indexOf.call(editbutton.parentElement.parentNode, editbutton.parentNode);
  var refElement = editbutton.parentNode.nextElementSibling;
  delete_element(editbutton.parentNode.id);
  //addElement(html_string,"existing_project_list",index);
  addbefore(html_string, "existing_project_list", refElement);
}
function p_edit_done(donebutton) {
  var info = getAllInputText(donebutton.parentNode.id);
  html_string = p_new(info, donebutton.parentNode.id);
  //index=Array.prototype.indexOf.call(projectlist, donebutton.parentNode);
  var refElement = donebutton.parentNode.nextElementSibling;
  delete_element(donebutton.parentNode.id);
  addbefore(html_string, "existing_project_list", refElement);
  //SAVEDATA
  p_save(info);
}
function p_datafix(info){
  return [info[0].split("  ( ")[0],info[0].split("  ( ")[1].slice(0,-2),info[1],info[2]];
}
//---------------EXperience------------------

var e_count = 0;
function e_load(list) {
  if(!list.length>0){return;}
  for (let i = 0; i < list.length; i++) {
    e_count += 1;
    let info = [list[i].title,list[i].employment_type,list[i].company_name,list[i].start_year,list[i].end_year,list[i].description];
    html_string = e_new(info, e_count);
    addElement(html_string, "exp_list", -1);
  }
}
e_load(user.work_experience);
console.log(user.work_experience);
function e_save() {
  user.work_experience=[];
  exp_list=document.getElementById("exp_list");
  for (let i = 0; i < exp_list.childNodes.length; i++) {
   exp = exp_list.children[i];
    info=[];
    //testinput=exp.querySelector('input');
    if(exp){if(exp.querySelector('input')){
      info=getAllInputText(exp.id);
    }
    else if(!exp.classList.contains('testt')){
      info=e_datafix(getTextInDivs(exp));
    }
    else{continue;}}
    else{
      continue;
    }
    user.work_experience.push({
      title: info[0],
      employment_type: info[1],
      company_name: info[2],
      start_year: info[3],
      end_year: info[4],
      description: info[5],
    });
    console.log(info);
  }
  Save();
  console.log("save done" +user.work_experience);
}
function e_new(info, id) {
  return (
    '<div class="exp" id="e_' +
    id +
    '">' +
    '<div class="e_info1">' +
    info[0] +
    "</div>" +
    '<div class="e_info2">' +
    info[1] +
    "</div>" +
    '<div class="e_info2">' +
    info[2] +
    "</div>"+
    '<div class="e_info2">' +
    info[5] +
    "</div>"+
    '<div class="e_info3">' +
    info[3] +
    " - " +
    info[4] +
    "</div>" +
    '<i class="fa fa-edit editbutton" onclick=e_edit_button(this)></i></div>'
  );
  //'<button class="edit_button" onclick=e_edit_button(this)>Edit</button>
}
function e_add_button() {
  e_count += 1;
  var info = getAllInputText("new_exp_box");
  html_string = e_new(info, e_count);
  addElement(html_string, "exp_list", -1);
  clearinput("new_exp_box");
  //SAVEDATA
  e_save();
}

function e_new_editbox(info, id) {
  return (
    '<div class="new_exp_box" id="' +
    id +
    '">' +
    '<div class="in_line" id="new_exp_l1">' +
    '<input type="text" id="e_title" placeholder="Title" class="in_box e_title" value="' +
    info[0] +
    '"/>' +
    '<input type="text" id="e_type" placeholder="Employment Type" class="in_box e_type"value="' +
    info[1] +
    '"/></div>' +
    '<div class="in_line" id="new_exp_l2">' +
    '<input type="text" id="e_comname" placeholder="Company name" class="in_box e_comname"value="' +
    info[2] +
    '"/></div>' +
    '<div class="in_line" id="new_exp_l3">' +
    '<input type="text" id="e_start" placeholder="Start Year" class="in_box e_start"value="' +
    info[3] +
    '"/>' +
    '<input type="text" id="e_end" placeholder="End Year" class="in_box e_end"value="' +
    info[4] +
    '"/></div>' +
    ' <div class="in_line" id="new_exp_l4">' +
    '<input type="text" id="e_detail" placeholder="Detail..." class="in_box e_detail"value="' +
    info[5] +
    '"/></div>' +
    '<button id="done" onclick=e_edit_done(this)>Save</button>' +
    '<button id="delete" onclick=delete_parent(event);e_save();>Delete</button></div>'
  );
}
function e_edit_button(editbutton) {
  
  info = e_datafix(getTextInDivs(editbutton.parentNode)); 
  html_string = e_new_editbox(info, editbutton.parentNode.id);
  //var index=Array.prototype.indexOf.call(editbutton.parentElement.parentNode, editbutton.parentNode);
  var refElement = editbutton.parentNode.nextElementSibling;
  delete_element(editbutton.parentNode.id);
  //addElement(html_string,"existing_project_list",index);
  addbefore(html_string, "exp_list", refElement);
}
function e_edit_done(donebutton) {
  var info = getAllInputText(donebutton.parentNode.id);
  html_string = e_new(info, donebutton.parentNode.id);
  //index=Array.prototype.indexOf.call(projectlist, donebutton.parentNode);
  var refElement = donebutton.parentNode.nextElementSibling;
  delete_element(donebutton.parentNode.id);
  addbefore(html_string, "exp_list", refElement);
  //SAVEDATA
  e_save();
}
function e_datafix(info){
  return [info[0],info[1],info[2],info[4].split(" - ")[0],info[4].split(" - ")[1],info[3]];
}