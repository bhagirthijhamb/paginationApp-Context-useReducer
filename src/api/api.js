const URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch students");
  }

  const transformedStudents = [];

  for (const item of data) {
    const studentObj = {
      id: item.id,
      name: item.name,
      email: item.email,
      company: item.company.name,
      phone: item.phone,
      geo: item.address.geo,
      tags: [],
    };
    transformedStudents.push(studentObj);
  }

  return transformedStudents;
};
