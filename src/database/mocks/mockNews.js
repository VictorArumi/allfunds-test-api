const mockNews = [
  {
    title: "Second in date",
    description: "this description should appear second",
    storageDate: "2001-01-31T23:00:00.000Z",
    content: "This is the content of the second new to appear",
    archived: false,
    author: "638c7ab09697e7ea8b97edba",
    id: "638c7f589697e7ea8b97edc7",
  },
  {
    title: "First in date",
    description: "this description should appear first",
    storageDate: "2022-01-31T23:00:00.000Z",
    content: "This is the content of the first new to appear",
    archived: true,
    archiveDate: "2022-01-31T23:00:00.000Z",
    author: "638c7ab09697e7ea8b97edba",
    id: "638c88209697e7ea8b97edd0",
  },
  {
    title: "last in date",
    description: "this description should appear last",
    storageDate: "1992-01-31T23:00:00.000Z",
    content: "This is the content of the last new to appear",
    archived: false,
    archiveDate: "1992-01-31T23:00:00.000Z",
    author: "638c7ab09697e7ea8b97edba",
    id: "638c92a99697e7ea8b97edd5",
  },
  {
    title: "not to appear in news as is archived",
    description: "this description should appear last",
    storageDate: "1992-01-31T23:00:00.000Z",
    content: "This is the content of the last new to appear",
    archived: true,
    archiveDate: "1992-01-31T23:00:00.000Z",
    author: "638c7ab09697e7ea8b97edba",
    id: "638c92a99697e7ea8b97edd5",
  },
];

module.exports = { mockNews };
