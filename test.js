let data = [];
let rawData =
  '{\n  "title": "Pembuatan Kolam Ikan Lele",\n  "tasks": [\n    {\n      "task": "Membangun kolam ikan lele",\n      "priority": "High",\n      "due_date": "2022-05-01"\n    },\n    {\n      "task": "Menggali lubang kolam dengan dimensi 4x6 meter",\n      "priority": "Medium",\n      "due_date": "2022-05-05"\n    },\n    {\n      "task": "Membuat kerangka kolam menggunakan kayu atau besi",\n      "priority": "Medium",\n      "due_date": "2022-05-08"\n    },\n    {\n      "task": "Memasang liner plastik sebagai penahan air",\n      "priority": "High",\n      "due_date": "2022-05-10"\n    },\n    {\n      "task": "Mengisi kolam dengan air bersih",\n      "priority": "High",\n      "due_date": "2022-05-12"\n    },\n    {\n      "task": "Mengatur sistem sirkulasi air dan filter",\n      "priority": "High",\n      "due_date": "2022-05-15"\n    },\n    {\n      "task": "Menanam rumput di sekitar kolam",\n      "priority": "Low",\n      "due_date": "2022-05-20"\n    },\n    {\n      "task": "Menambahkan pupuk organik untuk pertumbuhan alga",\n      "priority": "Medium",\n      "due_date": "2022-05-22"\n    },\n    {\n      "task": "Memasukkan bibit ikan lele ke dalam kolam",\n      "priority": "High",\n      "due_date": "2022-05-25"\n    },\n    {\n      "task": "Memberi pakan ikan lele secara teratur",\n      "priority": "High",\n      "due_date": "2022-05-28"\n    },\n    {\n      "task": "Memastikan kualitas air kolam tetap optimal",\n      "priority": "High",\n      "due_date": "2022-06-01"\n    },\n    {\n      "task": "Melakukan pemeliharaan dan pembersihan kolam secara berkala",\n      "priority": "Medium",\n      "due_date": "2022-06-05"\n    }\n  ]\n}';
let parsedData = JSON.parse(rawData);
console.log(parsedData);
data.push({
  title: parsedData.title,
  tasks: parsedData.tasks.map((task) => ({
    task: task.task,
    priority: task.priority,
    due_date: task.due_date,
  })),
});

console.log(data);
console.log(data[0].title); // Outputs: 'Pembuatan Kolam Ikan Lele'

data[0].tasks.forEach((task) => {
  console.log("Task: " + task.task);
  console.log("Priority: " + task.priority);
  console.log("Due Date: " + task.due_date);
});
