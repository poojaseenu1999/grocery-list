let alert = document.querySelector('.alert');
let form = document.querySelector('.grocery-form')
let input = document.querySelector('input');
let submit = document.querySelector('.submit');
let container = document.querySelector('.grocery-container');
let list = document.querySelector('.grocery-list');
let clear = document.querySelector('.clear');


// declaring constans

let editElements;
let editFlag = false;
let editId = ''


// event handlers
form.addEventListener('submit', handlesubmit);
clear.addEventListener('click', clearItems);



//functions
function handlesubmit(e){
    e.preventDefault();
    let value = input.value
    const id = new Date().getTime().toString();
    
    if(value && !editFlag){
        let element = document.createElement('article');
        element.classList.add('grocery-item');
        let attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);

        element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit">
                <i class="fas fa-edit"></i>
                edit
            </button>
            <button type="button" class="delete">
                <i class="fa-sharp fa-solid fa-trash"></i>
                delete
            </button>
        </div>
        `

        list.appendChild(element);
        displayAlert('item added to list', 'green');
        container.classList.add('show-container');
        addtoLocalStorage(id,value);
        setBackToDefault();

    }
    else if(value && editFlag) {
        console.log('value edit')
    }
    else {
        displayAlert('empty string', 'red')
    }
}


function displayAlert(text,action){
    alert.textContent = text;
    alert.style.backgroundColor = `${action}`;
    setTimeout(() => {
     alert.textContent = "";
    alert.style.backgroundColor = 'none';
    },1000)
};

function setBackToDefault(){
    input.value = '';
    editFlag= false;
    editId = '';
    submit.textContent = 'submit'
}

function addtoLocalStorage(){
    console.log('add to storage')
}

// clear items we should all the items using classname added to article element.
//if the length of the items is greater than 0, then loop thr the items and use the parent element(list) and remove its child.
//also remove the show-container class
function clearItems(){
    let items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach((item) => list.removeChild(item))
    }
    container.classList.remove('show-container');
    displayAlert('all items are removed', 'blue');
    setBackToDefault();
}