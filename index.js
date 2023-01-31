const tasks = document.querySelectorAll(".task"); // [dfdf, dfdf, dfd]
const dropTargets = document.querySelectorAll(".tasks-container"); // []
[...tasks].forEach((task) => {
    task.addEventListener("drag", (e) => {
        e.preventDefault();
    });
    task.addEventListener("drop", (e) => {
        e.preventDefault();
    });
    task.addEventListener("dragstart", function (e) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", this.id);
    });
});

[...dropTargets].forEach((dropTarget) => {
    dropTarget.addEventListener("dragenter", function (e) {
        e.preventDefault();
    });

    dropTarget.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    dropTarget.addEventListener("drop", function (e) {
        e.stopPropagation();
        const itemBoxId = e.dataTransfer.getData("text/plain"); // i retrive the task
        console.log(this);
        console.log(itemBoxId);
        const task = document.querySelector(`#${itemBoxId}`);
        // this = the container in which the task is dropped
        // e.target
        this.append(task);
    });
});

function randomIdGen() {
    let id = "";
    for (let i = 0; i < 8; i++) {
        id += Math.floor(Math.random() * 9);
    }
    return id;
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = document.querySelector("#task-input").value.trim();
    const id = randomIdGen();
    const htmlElement = `
    <div id="task-${id}" class="task" draggable="true">
        <p>${taskTitle}</p>
    </div>
    `;
    document
        .querySelector("#open")
        .insertAdjacentHTML("beforeend", htmlElement);
    console.log(id);
    document
        .querySelector(`#task-${id}`)
        .addEventListener("dragstart", function (e) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", this.id);
        });
});
