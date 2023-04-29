const dotenv = require("dotenv");
dotenv.config();
// const { v4: uuidv4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {DynamoDBDocument} = require("@aws-sdk/lib-dynamodb");
const {
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { default: axios } = require("axios");
const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
// Whether to return numbers as a string instead of converting them to native JavaScript numbers.
wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

const client = new DynamoDBClient({ regions: process.env.AWS_REGION });
const docClient = DynamoDBDocument.from(client, translateConfig);

function buildUpdateExpression(Item) {
    let UpdateExpression = "set";
    const ExpressionAttributeValues = {};
    for (const key in Item) {
        if (Item[key] !== undefined){
            UpdateExpression += ` ${key} = :${key},`;
            ExpressionAttributeValues[`:${key}`] = Item[key];
        }
    }
    UpdateExpression = UpdateExpression.slice(0, -1);
    return { UpdateExpression, ExpressionAttributeValues };
  }
exports.getUserData = async (req, res) => {
    const user = req.user;
    console.log(process.env.aws_userData_table_name)
    console.log(user);
    const params = {
        TableName: process.env.aws_userData_table_name,
        Key: {
            "student_id": user.id,
        },
        UpdateExpression: "set firstname = :firstname, lastname = :lastname",
        ExpressionAttributeValues: {
            ":firstname": user.firstname_en,
            ":lastname": user.lastname_en,
        },
        ReturnValues : "ALL_NEW"
    }
    try{
        console.log("sending")
        docClient.send(new UpdateCommand(params)).then((data) => {
            const userdata = {
                "student_id": data.Attributes.student_id,
                "firstname": data.Attributes.firstname,
                "lastname": data.Attributes.lastname,
                "nickname": data.Attributes.nickname ?? '',
                "address" : data.Attributes.address ?? '',
                "tel_no" : data.Attributes.tel_no ?? '',
                "email" : data.Attributes.email ?? '',
                "github" : data.Attributes.github ?? '',
                "linkedin" : data.Attributes.linkedin ?? '',
                "education" : data.Attributes.education ?? [],
                "language_skill" : data.Attributes.language_skill ?? [],
                "framework_skill" : data.Attributes.framework_skill ?? [],
                "tools_skill" : data.Attributes.tools_skill ?? [],
                "other_skill" : data.Attributes.other_skill ?? [],
                "work_experience" : data.Attributes.work_experience ?? [],
                "projects" : data.Attributes.projects ?? [],
            }
            console.log("sent");
            res.status(200).send(userdata);
        });
    }catch(err){
        console.log(err);
        res.status(502).send('Fail to update user data.');
    }
}

exports.updateUserData = async (req, res) => {
    try{
        const data = req.body;
        const user = req.user;
        // console.log(process.env.aws_userData_table_name)
        const education = data.education ? data.education.map((item) => {
            return {
                "degree" : item.degree,
                "university_name" : item.university_name,
                "field_of_study" : item.field_of_study,
                "start_year" : item.start_year,
                "graduation_year" : item.graduation_year ?? ""
            }}) : []
        function skillMap(skill){
            return skill ? skill.map((item) => {
                return {
                    "id" : item.id,
                    "name" : item.name,
                }
            }) : []
        }
        const language_skill = skillMap(data.language_skill)
        const framework_skill = skillMap(data.framework_skill)
        const tools_skill = skillMap(data.tools_skill)
        const other_skill = skillMap(data.other_skill)
        const work_experience = data.work_experience ? data.work_experience.map((item) => {
            return {
                "title" : item.title,
                "employment_type" : item.employment_type,
                "company_name" : item.company_name,
                "start_year" : item.start_year,
                "end_year" : item.end_year ?? "",
                "description" : item.description ?? "",
            }}) : []
        const projects = data.projects ? data.projects.map((item) => {
            return {
                "title" : item.title,
                "year" : item.year,
                "link" : item.link ?? "",
                "detail" : item.detail ?? "",
            }}) : []
        const Items = {
                "firstname": data.firstname ?? user.firstname_en,
                "lastname": data.lastname ?? user.lastname_en,
                "nickname": data.nickname,
                "address": data.address,
                "tel_no": data.tel_no,
                "email": data.email,
                "github": data.github,
                "linkedin": data.linkedin,
                "education": education,
                "language_skill": language_skill,
                "framework_skill": framework_skill,
                "tools_skill": tools_skill,
                "other_skill": other_skill,
                "work_experience": work_experience,
                "projects": projects,
        }
        const params = {
            TableName: process.env.aws_userData_table_name,
            Key: {
                "student_id": user.id,
            },
            ... buildUpdateExpression(Items),
            ReturnValues : "ALL_NEW"
        }
        try{
            console.log(JSON.stringify(params,null,2))
            docClient.send(new UpdateCommand(params)).then((data) => {
                const userdata = {
                    "student_id": data.Attributes.student_id,
                    "firstname": data.Attributes.firstname,
                    "lastname": data.Attributes.lastname,
                    "nickname": data.Attributes.nickname ?? '',
                    "address" : data.Attributes.address ?? '',
                    "tel_no" : data.Attributes.tel_no ?? '',
                    "email" : data.Attributes.email ?? '',
                    "github" : data.Attributes.github ?? '',
                    "linkedin" : data.Attributes.linkedin ?? '',
                    "education" : data.Attributes.education ?? [],
                    "language_skill" : data.Attributes.language_skill ?? [],
                    "framework_skill" : data.Attributes.framework_skill ?? [],
                    "tools_skill" : data.Attributes.tools_skill ?? [],
                    "other_skill" : data.Attributes.other_skill ?? [],
                    "work_experience" : data.Attributes.work_experience ?? [],
                    "projects" : data.Attributes.projects ?? [],
                }
                res.status(200).send(userdata);
            });
        }catch(err){
            console.log(err);
            res.status(502).send('Fail to update user data.');
        }
    }catch(err){
        console.log(err);
        res.status(401).send('Unauthorized.');
    }
}

exports.getData = async (req, res) => {
    try{
        const params = {
            TableName: process.env.aws_userData_table_name,
            Key: {
                "student_id": req.user.id,
            }
        }
        try{
            docClient.send(new GetCommand(params)).then((data) => {
                const userdata = {
                    "student_id": data.Item.student_id,
                    "firstname": data.Item.firstname,
                    "lastname": data.Item.lastname,
                    "nickname": data.Item.nickname ?? '',
                    "address" : data.Item.address ?? '',
                    "tel_no" : data.Item.tel_no ?? '',
                    "email" : data.Item.email ?? '',
                    "github" : data.Item.github ?? '',
                    "linkedin" : data.Item.linkedin ?? '',
                    "education" : data.Item.education ?? [],
                    "language_skill" : data.Item.language_skill ?? [],
                    "framework_skill" : data.Item.framework_skill ?? [],
                    "tools_skill" : data.Item.tools_skill ?? [],
                    "other_skill" : data.Item.other_skill ?? [],
                    "work_experience" : data.Item.work_experience ?? [],
                    "projects" : data.Item.projects ?? [],
                }
                res.status(200).send(userdata);
            });
        }catch(err){
            console.log(err);
            res.status(502).send('Fail to get user data.');
        }
    }catch(err){
        console.log(err);
        res.status(401).send('Unauthorized.');
    }
}