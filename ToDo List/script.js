
        function addTask() {
            const input = document.getElementById("taskInput");
            const taskText = input.value;

            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }

            const li = document.createElement("li");
            li.textContent = taskText;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Clear";
            removeBtn.style.marginLeft = "10px";
            removeBtn.onclick = function () {
                li.remove();
            };

            li.appendChild(removeBtn);
            document.getElementById("taskList").appendChild(li);

            input.value = ""; 
        }
   