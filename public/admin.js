// Your Code Here
async function bookTitles() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();

  books.forEach(renderTitles);
}

function renderTitles(book) {
  let root = document.querySelector("#root");

  let container = document.createElement("div");
  container.setAttribute("class", "container-sm");

  let div = document.createElement("div");
  div.setAttribute("class", "input-group mb-3");

  let h3 = document.createElement("h3");
  h3.textContent = book.title;
  h3.style.marginRight = "20px";

  let quantityInput = document.createElement("input");
  quantityInput.setAttribute("class", "form-control");
  quantityInput.setAttribute("placeholder", book.quantity);

  let saveButton = document.createElement("button");
  saveButton.setAttribute("class", "btn btn-outline-secondary");
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: book.id,
        quantity: quantityInput.value,
      }),
    });
  });

  div.append(h3, quantityInput, saveButton);
  container.append(div);
  root.append(container);
}

bookTitles();
