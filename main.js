//Gerekli HTML Elementleri
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

//Düzenleme Seenekleri
let editElemet;
let editFlag = false; //Düzenleme modunda olup olmaddığını belirtir
let editID = ""; // Düzenleme yapılan öğenin benzersizliği

//! olay İzleyicisi
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

//fonksiyonlar
function displayAlert(text, action) {
    console.log(text, action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`);
    }, 2000)
}

function addItem(e) {
    e.preventDefault();// formun otomatik olarak gönderilmesini engelle
    const value = grocery.value; //form içerisinde bulunan input değerini alma
    const id = new Date().getTime().toString(); //benzersiz bir id oluşturduk.

    //Eğer değer boş değilse ve düzenleme modunda değilse
    if (value !== "" && !editFlag) {
        const element = document.createElement("article");//yeni bir "article" ögesi oluşturur.  
        let attr = document.createAttribute("data-id"); //yeni veri kimliği oluşturur
        attr.value = id;
        element.setAttributeNode(attr); //oluşturduğumuz elemente ekledik
        element.classList.add("grocery-item"); //oluşturduğumuz elemente class ekledik
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
             <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
             </div>
        `;

        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        //kapsayıcı ekleme yapma
        list.appendChild(element);
        displayAlert("Başariyla Eklendi","success"); 
        container.classList.add("show-container");

        //içerik kısmını sıfırlama
        grocery.value = "";
    }else if (value !== "" && editFlag) {  
        editElement.innerHTML = value;
        displayAlert("Değer Değiştirildi", "success");
    } else {
        displayAlert("Lütfen bir değer giriniz.", "danger");
    }
}

// silme fonksiyonu
function deleteItem(e) {
const element = e.currentTarget.parentElement.parentElement
const id = element.dataset.id;
list.removeChild(element);

    displayAlert("Öge kaldirildi", "danger");
}
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    console.log(items);
    if (items.length > 0) {
        items.forEach((item) => list.removeChild(item));
    }
    container.classList.remove("show-container"); //konteynarı gizle
    displayAlert("Liste Boş","danger");
}

//düzenleme fonksiyonu
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //düzenleme yapılan öge
    editElement = e.currentTarget.parentElement.previousElementSibling;
    
    //form içerisinde bulunana input değeri öğrenin metniyle doldur.
    grocery.value = editElement.innerHTML;

        editFlag = true;
        editID = element.dataset.id;
        console.log(element.dataset.id); // düzenlenen ögenin kimliği
        submitBtn.textContent = "Düzenle";
}
 