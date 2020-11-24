function trimStringProperties(obj) {
  const cloneObj = JSON.parse(JSON.stringify(obj));

  for (let key in cloneObj) {
    if (typeof cloneObj[key] === "string") {
      cloneObj[key] = cloneObj[key].trim();
    }

    if (typeof cloneObj[key] === "object" && !Array.isArray(cloneObj[key])) {
      cloneObj[key] = trimStringProperties(cloneObj[key]);
    }

    if (typeof cloneObj[key] === "object" && Array.isArray(cloneObj[key])) {
      cloneObj[key] = trimArrayItems(cloneObj[key]);
    }
  }

  return cloneObj;
}

function trimArrayItems(array) {
  return array.map((data) => {
    if (typeof data === "string") {
      return data.trim();
    }

    if (typeof data === "object" && !Array.isArray(data)) {
      return trimStringProperties(data);
    }

    if (typeof data === "object" && Array.isArray(data)) {
      return trimArrayItems(data);
    }

    return data;
  });
}

const data = trimStringProperties({
  enterprise: "    enterprise 1     ",
  projects: "project 1     ",
  testData: 1,
  test2: {
    enterprise: "   enterprise 1",
    project: "    project",
    deeperTest: {
      enterprise: "    enterprise 3",
      project: "  project x   ",
    },
  },
  test3: [
    1,
    "   x  ",
    {
      test2: "test    ",
    },
    [2, "  y ", { test: 3 }],
  ],
});

console.log(data);

// {
//   enterprise: "enterprise 1",
//   projects: "project 1",
//   testData: 1,
//   test2: {
//     enterprise: "enterprise 1",
//     project: "project",
//     deeperTest: { enterprise: "enterprise 3", project: "project x" },
//   },
//   test3: [1, "x", { test2: "test" }, [2, "y", { test: 3 }]],
// };
