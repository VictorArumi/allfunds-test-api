# News-API

## Technical skills assessment for Allfunds.

News API is a RESTful API created with Express and connected to MongoDB database. Four basic operations (CRUD) can be performed on database: Create, Read, Update, and Delete.

## **_ ENDPOINTS _**

- GET:

  - /news -> It returns all the news in the database that are not archived. Response is a JSON object 'news' with an array of 'new' objects with property 'archived':false sorted by 'storageDate'.

  - /news/archived -> It returns all the news in the database that are archived. Response is a JSON object 'archivedNews' with an array of 'new' objects with property 'archived':true sorted by 'archiveDate'.

- POST:

  - /news/create -> It allows to create news in the database. It returns a JSON object 'createdNew' with the created new.

- PUT:

  - /news/edit/:id -> It allows to archive a new. This endpoint will set the new with the id provided with 'archived':true, and 'archiveDate' with the date of archive. It returns a JSON object 'updatedNew' with the new modified as defined above.

- DELETE:
  - /news/archived/:id -> It allows to delete a new. The new with the id provided will be deleted from the database. When a new is deleted it returns a JSON object with 'msg': "New with id XXX has been deleted".

<br/>
All the data is stored in MongoDB. The database allfundsnews has 2 collections: news and authors. Each collection contains documents based on New and Author schemas detailed below.
<br/>

</br>

---

**Model Schemas**

```
.
└── New
    └── title: String
    └── description: String
    └── storageDate: Date
    └── content: String
    └── author: Schema.Types.ObjectId
    └── archived: Boolean
    └── archiveDate: Date

.
└── Author
    └── authorName: String



```

<br/>

<div align="center">
<br/>

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=VictorArumi_allfunds-test-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=VictorArumi_allfunds-test-api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=VictorArumi_allfunds-test-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=VictorArumi_allfunds-test-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=VictorArumi_allfunds-test-api&metric=bugs)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=VictorArumi_allfunds-test-api&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=VictorArumi_allfunds-test-api)

---

<br/>

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express](https://img.shields.io/badge/express-%2320232a.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%2320232a.svg?style=for-the-badge&logo=mongodb&logoColor=%2361DAFB)
![Render](https://img.shields.io/badge/render-%2320232a.svg?style=for-the-badge&logo=render&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

</div>

<div align="center">
<br/>

---

## [API Url](https://news-api-allfunds.onrender.com/) 🔗

</div>

---

<br/>

## Commands

```shell
    # Installation command
    npm i or npm/yarn i

    # Running command
    npm start or npm start-dev (for dev mode)

    # Testing command
    npm test
```

<br/>

---

<br/>

## License

[MIT](https://opensource.org/licenses/MIT)
